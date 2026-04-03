"use client";

import React, { createContext, useReducer, useEffect, useMemo } from "react";
import { saveRedisSurveyHistory } from "@/action/redisApi";
import { SurveyAPIResponse, SurveyQuestionData } from "@/types/survey";

interface State {
  currentStep: string;
  answers: Record<string, any>;
}

type Action =
  | { type: "SET_STEP"; payload: string }
  | { type: "UPDATE"; payload: { key: string; value: any } }
  | { type: "HYDRATE_ANSWERS"; payload: Record<string, any> }
  | { type: "NEXT"; payload: { flow: string[] } }
  | { type: "PREV"; payload: { flow: string[] } };

// Helper function to synchronously evaluate the flow based on latest answers
const getGeneratedFlow = (
  surveyData: SurveyAPIResponse,
  answers: Record<string, any>,
  questionsMap: Record<string, SurveyQuestionData>
) => {
  const generatedFlow: string[] = [];

  surveyData.data.stages.forEach((stage) => {
    stage.questions.forEach((q) => {
      generatedFlow.push(q.id.toString());
    });
  });

  // Filter out conditional questions first!
  const filteredFlow = generatedFlow.filter((stepId) => {
    const q = questionsMap[stepId];
    if (!q) return true;

    // === CUSTOM DEPENDENCY RULES ===
    // "What's driving you to make this change?" -> depends on "goal" (ID: 103)
    if (q.field_id === "motivation_fat_loss" && answers["goal"] !== "GOAL_001") return false;
    if (q.field_id === "motivation_muscle" && answers["goal"] !== "GOAL_002") return false;
    if (q.field_id === "motivation_lean" && answers["goal"] !== "GOAL_003") return false;
    if (q.field_id === "motivation_health" && answers["goal"] !== "GOAL_004") return false;
    
    // Skip target_weight and event if goal is "Get healthier" (GOAL_004)
    if ((q.field_id === "target_weight" || q.field_id === "event") && answers["goal"] === "GOAL_004") return false;

    // Skip equipment/weights if location is "No equipment" (LOC_004)
    if ((q.field_id === "equipment" || q.field_id === "weights") && answers["location"] === "LOC_004") return false;

    // Skip weights if no equipment is selected or if "EQUIP_013" (No equipment — bodyweight only) is selected in the equipment checkbox question
    if (q.field_id === "weights") {
      const eq = answers["equipment"];
      if (!eq || (Array.isArray(eq) && (eq.length === 0 || eq.includes("EQUIP_013")))) return false;
    }

    return true;
  });

  // Force 'name' question to appear after 'days' question
  const nameId = Object.values(questionsMap).find(q => q.field_id === "name")?.id.toString();
  const daysId = Object.values(questionsMap).find(q => q.field_id === "days")?.id.toString();

  if (nameId && daysId) {
    const nameIdx = filteredFlow.indexOf(nameId);
    if (nameIdx > -1) {
      filteredFlow.splice(nameIdx, 1); // Remove from current position
      const newDaysIdx = filteredFlow.indexOf(daysId);
      if (newDaysIdx > -1) {
        filteredFlow.splice(newDaysIdx + 1, 0, nameId); // Re-insert after days
      }
    }
  }

  // Now insert checkpoints at 40% and 70% and 100% dynamically based on the actual length
  const total = filteredFlow.length;
  const i40 = Math.floor(total * 0.4);
  const i70 = Math.floor(total * 0.7);

  // We splice backwards so indices don't shift for earlier insertions
  filteredFlow.splice(i70, 0, "checkpoint");
  filteredFlow.splice(i40, 0, "email_gate", "insight");
  filteredFlow.push("complete");

  return filteredFlow;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };

    case "UPDATE":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.key]: action.payload.value,
        },
      };

    case "HYDRATE_ANSWERS":
      return { ...state, answers: action.payload };

    case "NEXT": {
      // action.payload.flow is evaluated inside the action creator to match the latest state?
      // Wait, if we evaluate it inside the action creator, we still have the closure issue!
      // We must evaluate it inside the reducer using the REDUCER's latest state!
      throw new Error("Handled above natively but need to restructure to pass surveyData and questionsMap");
    }
    case "PREV": {
      throw new Error("Handled above natively");
    }
    default:
      return state;
  }
};

// Reducer that takes surveyData and questionsMap in closure or payload
const createReducer = (surveyData: SurveyAPIResponse, questionsMap: Record<string, SurveyQuestionData>) => {
  return (state: State, action: Action): State => {
    switch (action.type) {
      case "SET_STEP":
        return { ...state, currentStep: action.payload };

      case "UPDATE":
        return {
          ...state,
          answers: {
            ...state.answers,
            [action.payload.key]: action.payload.value,
          },
        };

      case "HYDRATE_ANSWERS":
        return { ...state, answers: action.payload };

      case "NEXT": {
        // Compute flow using the absolute LATEST state.answers inside the reducer
        const newFlow = getGeneratedFlow(surveyData, state.answers, questionsMap);
        const i = newFlow.indexOf(state.currentStep);
        if (i >= 0 && i < newFlow.length - 1) {
          return { ...state, currentStep: newFlow[i + 1] };
        }
        return state;
      }
      case "PREV": {
        const newFlow = getGeneratedFlow(surveyData, state.answers, questionsMap);
        const i = newFlow.indexOf(state.currentStep);
        if (i > 0) {
          return { ...state, currentStep: newFlow[i - 1] };
        }
        return state;
      }
      default:
        return state;
    }
  };
};

interface OnboardingContextProps {
  state: State;
  next: () => void;
  prev: () => void;
  update: (key: string, value: any) => void;
  flow: string[];
  questionsMap: Record<string, SurveyQuestionData>;
  uuid: string;
}

export const OnboardingContext = createContext<OnboardingContextProps>({} as OnboardingContextProps);

export const OnboardingProvider = ({
  children,
  surveyData,
  uuid,
  initialResumeData,
  isNewUuid,
}: {
  children: React.ReactNode;
  surveyData: SurveyAPIResponse;
  uuid: string;
  initialResumeData: any | null;
  isNewUuid: boolean;
}) => {
  const allQuestions = useMemo(() => {
    return surveyData.data.stages.flatMap((s) => s.questions);
  }, [surveyData]);

  const questionsMap = useMemo(() => {
    const map: Record<string, SurveyQuestionData> = {};
    surveyData.data.stages.forEach((stage) => {
      stage.questions.forEach((q) => {
        const qWithSet = { ...q, set_id: stage.set_id };
        map[q.id.toString()] = qWithSet;
        if (q.field_id) map[q.field_id] = qWithSet;
      });
    });
    return map;
  }, [surveyData.data.stages]);

  // Use the closure-aware reducer
  const memoizedReducer = useMemo(() => createReducer(surveyData, questionsMap), [surveyData, questionsMap]);

  // Determine initial state based on SSR resume data
  // 🐛 FIX: initialResumeData is already the unwrapped 'res.data' object returned by redisApi.ts
  const resume = initialResumeData;
  const initialAnswers: Record<string, any> = {};
  
  if (Array.isArray(resume?.answers)) {
    resume.answers.forEach((ans: any) => {
      if (ans.field_id) {
        // Special case for multi-select (checkboxes) if stored as comma separated list
        if (questionsMap[ans.field_id]?.type === "checkbox") {
          initialAnswers[ans.field_id] = ans.answer_id.split(", ");
        } else {
          initialAnswers[ans.field_id] = ans.answer_id;
        }
      }
    });
  }

  let initialStep = allQuestions.length > 0 ? allQuestions[0].id.toString() : "";
  if (resume?.answers && resume.answers.length > 0) {
    const lastAnswer = resume.answers[resume.answers.length - 1];
    if (lastAnswer.question_id) {
      initialStep = lastAnswer.question_id.toString();
    }
  } else if (resume?.currentStep) {
    initialStep = resume.currentStep.toString();
  }

  const [state, dispatch] = useReducer(memoizedReducer, {
    currentStep: initialStep,
    answers: initialAnswers,
  });

  // Client-side initialization
  useEffect(() => {
    // If a new UUID was generated on the server, we must set it in the client browser cookie 
    // because Server Components cannot set cookies directly.
    if (isNewUuid) {
      document.cookie = `survey_uuid=${uuid}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, [isNewUuid, uuid]);

  // Debounced Autosave to Redis tracking
  const autosaveTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Don't autosave if there are no answers yet
    if (Object.keys(state.answers).length === 0) return;

    // Clear existing timer
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }
    // Set new timer for debounce (1000ms)
    autosaveTimerRef.current = setTimeout(async () => {
      try {
        // Transform answers record to array for backend schema
        const answersArray = Object.entries(state.answers).map(([key, value]) => {
          const q = questionsMap[key];
          
          let answerText = "";
          let answerId = "";

          if (q && q.options) {
            if (Array.isArray(value)) {
              const labels = q.options
                .filter(opt => value.includes(opt.value))
                .map(opt => opt.label);
              answerText = labels.length > 0 ? labels.join(", ") : value.join(", ");
              answerId = value.join(", ");
            } else {
              const opt = q.options.find(o => o.value === value);
              answerText = opt ? opt.label : String(value);
              answerId = String(value);
            }
          } else {
            answerText = String(value);
            answerId = String(value);
          }

          return {
            question_id: q ? q.id : (Number(key) || 0),
            field_id: q ? q.field_id : key,
            answer_id: answerId,
            answer: answerText,
            set_id: q ? q.set_id : 0,
          };
        });

        await saveRedisSurveyHistory({
          variation_id: 4,
          answers: answersArray,
          currentStep: Number(state.currentStep) || 0,
          email: state.answers["email"] || null,
          isEmailVerified: false, // Placeholder or from state if available
        }, uuid);
        console.log("Autosaved successfully to Redis");
      } catch (err) {
        console.error("Autosave failed", err);
      }
    }, 1000);

    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    };
  }, [state.answers, state.currentStep, uuid, surveyData]);

  // Sync state changes to localstorage (avoids doing it purely in reducer/actions)
  useEffect(() => {
    if (Object.keys(state.answers).length > 0) {
      localStorage.setItem("onboarding_data", JSON.stringify(state.answers));
    }
    if (state.currentStep) {
      localStorage.setItem("onboarding_step", state.currentStep);
    }
  }, [state.answers, state.currentStep]);

  // Expose the CURRENT flow to the UI (for progress bars, debugging, etc)
  const flow = useMemo(() => getGeneratedFlow(surveyData, state.answers, questionsMap), [surveyData, state.answers, questionsMap]);

  const update = (key: string, value: any) => {
    dispatch({ type: "UPDATE", payload: { key, value } });
  };

  const nextAction = () => {
    // Dispatch action so reducer handles flow generation synchronously with newest state
    dispatch({ type: "NEXT", payload: { flow: [] } });
  };

  const prevAction = () => {
    dispatch({ type: "PREV", payload: { flow: [] } });
  };

  return (
    <OnboardingContext.Provider value={{ state, next: nextAction, prev: prevAction, update, flow, questionsMap, uuid }}>
      {children}
    </OnboardingContext.Provider>
  );
};
