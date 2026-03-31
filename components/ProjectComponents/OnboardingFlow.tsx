"use client";

import { CheckpointScreen } from "@/components/ProjectComponents/CheckpointScreen";
import CompleteScreen from "@/components/ProjectComponents/CompletionScreen";
import DayMultiSelect from "@/components/ProjectComponents/DayMultiSelect";
import { EmailGate } from "@/components/ProjectComponents/EmailGate";
import { EquipmentQuestion } from "@/components/ProjectComponents/EquipmentQuestion";
import { EventQuestion } from "@/components/ProjectComponents/EventQuestion";
import { HeightQuestion } from "@/components/ProjectComponents/HeightQuestion";
import { InjuryQuestion } from "@/components/ProjectComponents/InjuryQuestion";
import { InsightScreen } from "@/components/ProjectComponents/InsightScreen";
import { NameQuestion } from "@/components/ProjectComponents/NameQuestion";
import { ProgressHeader } from "@/components/ProjectComponents/ProgressHeader";
import QuestionRenderer from "@/components/ProjectComponents/QuestionRenderer";
import WeightQuestion from "@/components/ProjectComponents/WeightQuestion";
import { WeightsSetupQuestion } from "@/components/ProjectComponents/WeightsSetupQuestion";
import { useOnboarding } from "@/hooks/useOnboarding";
import Image from "next/image";

const getComponentType = (question: any) => {
  // Try mapping by specific field_id first
  switch (question.field_id) {
    case "height": return "HEIGHT";
    case "weight": return "WEIGHT";
    case "target_weight": return "WEIGHT";
    case "event": return "EVENT";
    case "blocked_days": return "SELECT";
    case "equipment": return "EQUIPMENT";
    case "weights": return "WEIGHTS_SETUP";
    case "injury": return "INJURY";
    case "goal":
    case "gender":
    case "age":
    case "barrier":
      // Let standard renderer handle these if not explicitly custom
      break;
  }
  
  // Map by type
  if (question.type === "radio") return "RADIO";
  if (question.type === "checkbox") return "RADIO"; // Handled by same renderer conceptually if mapped properly
  if (question.type === "input") return "INPUT";
  
  return "RADIO";
};

export const componentMap: any = {
  RADIO: QuestionRenderer,
  INPUT: QuestionRenderer,
  EVENT: EventQuestion,
  NAME: NameQuestion,
  HEIGHT: HeightQuestion,
  WEIGHT: WeightQuestion,
  SELECT: DayMultiSelect,
  EQUIPMENT: EquipmentQuestion,
  WEIGHTS_SETUP: WeightsSetupQuestion,
  INJURY: InjuryQuestion,
};

export default function OnboardingFlow() {
  const { state, next, prev, update, flow, questionsMap } = useOnboarding();

  const current = state.currentStep;
  const currentIndex = flow.indexOf(current);
  const totalSteps = flow.length;

  // Find the question model. It uses the ID as the currentStep.
  const apiQuestion = questionsMap[current];

  // Adapter to match existing component props
  const mappedQuestion = apiQuestion
    ? {
        id: apiQuestion.field_id || apiQuestion.id.toString(),
        component: getComponentType(apiQuestion),
        label: apiQuestion.question,
        subLabel: apiQuestion.sub_question,
        options: apiQuestion.options,
        autoNext: apiQuestion.auto_next,
        selection: apiQuestion.type === "checkbox" ? "multiple" : "single",
      }
    : null;

  let content = null;

  if (mappedQuestion) {
    const Component = componentMap[mappedQuestion.component];

    if (!Component) {
      content = <div>Component not found</div>;
    } else {
      content = (
        <Component
          key={mappedQuestion.id}
          question={mappedQuestion}
          value={state.answers[mappedQuestion.id]}
          update={update}
          next={next}
        />
      );
    }
  } else if (current === "insight") {
    content = <InsightScreen next={next} />;
  } else if (current === "email_gate") {
    content = <EmailGate next={next} />;
  } else if (current === "checkpoint") {
    content = <CheckpointScreen next={next} />;
  } else if (current === "complete") {
    content = <CompleteScreen />;
  } else {
    content = <div>Loading...</div>;
  }

  const isFullWidth = mappedQuestion?.component === "WEIGHT" || mappedQuestion?.component === "HEIGHT";

  return (
    <div className="mx-auto flex min-h-screen flex-col">
      <div className="mb-2 hidden md:flex items-center justify-center bg-[#E9074B] p-5 lg:p-10">
        <Image
          src="/logo1.svg"
          alt="Decoration"
          width={200}
          height={50}
          priority
          className="object-cover"
        />
      </div>

      <div className=" ">
        {/* ✅ HEADER */}
        {currentIndex >= 0 && (
          <ProgressHeader
            currentIndex={currentIndex}
            totalSteps={totalSteps}
            onBack={prev}
          />
        )}

        {/* ✅ CONTENT */}
        <div className={isFullWidth ? "w-full" : "max-w-4xl flex-1 w-full mx-auto"}>
          {content}
        </div>
        <Image src="/Group.png" height={400} width={80} alt="l" className="absolute top-30 right-10 h-[700px] object-contain"/>
      </div>
    </div>
  );
}
