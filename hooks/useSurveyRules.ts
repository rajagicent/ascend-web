import { useMemo } from 'react';
import { SurveyQuestionData } from '@/types/survey';

export type MessageType = "info" | "warning" | "success";
export type MessageColor = "blue" | "red" | "green";

export interface ValidationMessage {
  text: string;
  type: MessageType;
  color: MessageColor;
}

export interface RuleEngineResult {
  isValid: boolean;
  message: ValidationMessage | null;
}

export const useSurveyRules = () => {
  const evaluateRules = (
    question: SurveyQuestionData & { component?: string; selection?: string },
    currentValue: any,
    allAnswers: Record<string, any>
  ): RuleEngineResult => {
    // Default valid state
    let isValid = true;
    let message: ValidationMessage | null = null;

    if (!question || !question.field_id) {
      return { isValid, message };
    }

    const setMsg = (text: string, type: MessageType, color: MessageColor, valid: boolean = true) => {
      message = { text, type, color };
      isValid = valid;
    };

    switch (question.field_id) {
      case "height":
        if (currentValue) {
          const heightCm = Number(currentValue);
          if (heightCm < 91 || heightCm > 244) {
            setMsg("Please double-check your height.", "warning", "red", false);
          }
        }
        break;

      case "target_weight":
        if (currentValue && allAnswers["weight"]) {
          const targetKg = Number(currentValue);
          const currentKg = Number(allAnswers["weight"]);
          const goal = allAnswers["goal"];

          // Goal: Fat Loss (GOAL_001)
          if (goal === "GOAL_001" && targetKg > currentKg) {
            setMsg("Your target is higher than your current weight. Did you mean to select Muscle Gain instead?", "warning", "red", false);
          }
          // Goal: Muscle Gain (GOAL_002)
          else if (goal === "GOAL_002" && targetKg < currentKg) {
            setMsg("Your target is lower than your current weight. Did you mean to select Fat Loss instead?", "warning", "red", false);
          }
          // Global Rules
          else if (targetKg < 40.8) { // ~90 lbs
            setMsg("That target seems very low. Please double-check.", "warning", "red", false);
          }
          else if (Math.abs(currentKg - targetKg) <= 0.9) { // ~2 lbs
            setMsg("You're almost at your goal already. Let's focus on maintaining and improving performance.", "warning", "red", false);
          }
          else {
            setMsg("Target set. We'll build your timeline around this.", "info", "blue", true);
          }
        }
        break;

      case "weight":
        if (currentValue) {
          setMsg("Your starting point is set. Now let's define where you're going.", "info", "blue", true);
        }
        break;

      case "event":
        if (currentValue && currentValue.event && currentValue.event !== "EVENT_000") {
          setMsg("We'll make sure you're ready by then. Pick your date below.", "info", "blue", true);
        } else if (currentValue && currentValue.event === "EVENT_000") {
           // No event selected
        }
        break;

      case "fitness":
        if (currentValue) {
          setMsg("We all start somewhere. Your program will build you up the right way.", "info", "blue", true);
        }
        break;

      case "days":
        if (currentValue) {
          const opt = question.options?.find((o: any) => o.value === currentValue);
          const label = opt ? opt.label : String(currentValue);
          
          if (label.includes("2")) {
            setMsg("Two focused sessions per week is enough to create real, measurable progress.", "info", "blue", true);
          } else if (label.includes("3")) {
            setMsg("Three days is the sweet spot for most people — enough to progress, enough to recover.", "info", "blue", true);
          } else if (label.includes("4")) {
            setMsg("Four days gives us room to build a structured, well-balanced program.", "info", "blue", true);
          } else if (label.includes("5")) {
            setMsg("Five days requires smart programming to avoid burnout. We'll build that in.", "info", "blue", true);
          } else if (label.includes("6")) {
            setMsg("Six days means recovery becomes part of the program. We'll plan around that.", "info", "blue", true);
          }
        }
        break;
        
      case "blocked_days":
        if (currentValue && Array.isArray(currentValue)) {
          if (currentValue.length === 7) {
            setMsg("Every day works for you — we'll build your 7-day program with full flexibility.", "info", "blue", true);
          } else {
            setMsg("Got it. We'll never schedule you on those days.", "info", "blue", true);
          }
        }
        break;

      case "equipment":
        if (currentValue) {
          setMsg("Got it. You can add or remove equipment anytime in your profile settings.", "info", "blue", true);
        }
        break;

      case "injury":
        if (currentValue) {
          setMsg("SAFETY DISCLAIMER: Ascend adapts your program based on what you share. If you’re currently in pain or recovering from surgery, consult your doctor before starting.", "info", "blue", true);
        }
        break;
        
      case "diet_type":
        if (currentValue) {
          setMsg("Got it. Every recipe in your plan will work with this — no exceptions.", "info", "blue", true);
        }
        break;
        
      case "coach":
        if (currentValue) {
          setMsg("No excuses accepted. We'll hold you to the standard you just set.", "info", "blue", true);
        }
        break;

      // Dynamic Mapping matching Labels/Options
      case "barrier":
      case "diet_quality":
      case "diet_pattern":
      case "motivation_fat_loss":
      case "motivation_muscle":
      case "motivation_lean":
      case "motivation_health":
        if (currentValue) {
          // Find option to get the specific API inline response or mapped message
          const opt = question.options?.find((o: any) => o.value === currentValue);
          if (opt && opt.inline_response) {
            setMsg(opt.inline_response, "info", "blue", true);
          } else if (opt && opt.label) {
            // Fallback for missing inline_response (though requirements say 'Return corresponding message')
            setMsg(`Got it: ${opt.label}. We'll adjust your plan accordingly.`, "info", "blue", true);
          }
        }
        break;
    }

    return { isValid, message };
  };

  /**
   * Applies constraints preventing certain selections entirely.
   */
  const checkConstraints = (
    field_id: string,
    proposedValue: any,
    allAnswers: Record<string, any>,
    questionsMap: Record<string, SurveyQuestionData>
  ): { allowed: boolean; reason?: string } => {
    
    // Constraint: If fitness = beginner, CANNOT select 6 days.
    if (field_id === "days") {
      const fitnessAns = allAnswers["fitness"];
      if (fitnessAns) {
        const fitnessQ = questionsMap["fitness"];
        const fitOpt = fitnessQ?.options?.find((o: any) => o.value === fitnessAns);
        const isBeginner = fitOpt && typeof fitOpt.label === "string" && fitOpt.label.toLowerCase().includes("beginner");

        if (isBeginner) {
          const daysQ = questionsMap["days"];
          const daysOpt = daysQ?.options?.find((o: any) => o.value === proposedValue);
          const daysLabel = daysOpt ? daysOpt.label : String(proposedValue);
          
          if (typeof daysLabel === "string" && daysLabel.includes("6")) {
            return { allowed: false, reason: "As a beginner, 6 days is too much volume. Please select fewer days to ensure optimal recovery." };
          }
        }
      }
    }

    return { allowed: true };
  };

  return { evaluateRules, checkConstraints };
};
