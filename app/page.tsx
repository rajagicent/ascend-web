/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { CheckpointScreen } from "@/components/ProjectComponents/CheckpointScreen"
import CompleteScreen from "@/components/ProjectComponents/CompletionScreen"
// import { CompletionScreen } from "@/components/ProjectComponents/CompletionScreen"
import DayMultiSelect from "@/components/ProjectComponents/DayMultiSelect"
import { EmailGate } from "@/components/ProjectComponents/EmailGate"
import { EquipmentQuestion } from "@/components/ProjectComponents/EquipmentQuestion"
import { EventQuestion } from "@/components/ProjectComponents/EventQuestion"
import { HeightQuestion } from "@/components/ProjectComponents/HeightQuestion"
import { InjuryQuestion } from "@/components/ProjectComponents/InjuryQuestion"
import { InsightScreen } from "@/components/ProjectComponents/InsightScreen"
import { NameQuestion } from "@/components/ProjectComponents/NameQuestion"
import { ProgressHeader } from "@/components/ProjectComponents/ProgressHeader" // ✅ ADD
import QuestionRenderer from "@/components/ProjectComponents/QuestionRenderer"
import WeightQuestion from "@/components/ProjectComponents/WeightQuestion"
import { WeightsSetupQuestion } from "@/components/ProjectComponents/WeightsSetupQuestion"
import { questions } from "@/config/questions.config"
import { useOnboarding } from "@/hooks/useOnboarding"
import Image from "next/image"

export const componentMap: any = {
  RADIO: QuestionRenderer,
  INPUT: QuestionRenderer,
  EVENT: EventQuestion,
  NAME: NameQuestion,
  HEIGHT: HeightQuestion,
  WEIGHT: WeightQuestion,
  SELECT :DayMultiSelect,
  EQUIPMENT:EquipmentQuestion,
  WEIGHTS_SETUP: WeightsSetupQuestion,
  INJURY: InjuryQuestion
  
}

export default function Page() {
  const { state, next, prev, update, flow } = useOnboarding()

  const current = state.currentStep
  const currentIndex = flow.indexOf(current)
  const totalSteps = flow.length
  const question = questions.find((q) => q.id === current)
  console.log("Question Object:", question)

  // 🔥 MAIN CONTENT RENDER
  let content = null

  if (question) {
    const Component = componentMap[question.component]

    if (!Component) {
      content = <div>Component not found</div>
    } else {
      content = (
        <Component
          key={question.id}
          question={question}
          value={state.answers[current]}
          update={update}
          next={next}
        />
      )
    }
  } else if (current === "insight") {
    content = <InsightScreen next={next} />
  } else if (current === "email_gate") {
    content = <EmailGate next={next} />
  } else if (current === "checkpoint") {
    content = <CheckpointScreen next={next} />
 
  } else if (current === "complete") {
    content = <CompleteScreen />
  } else {
    content = <div>Unknown step: {current}</div>
  }

  const isFullWidth = question?.component === "WEIGHT"
  // FINAL RETURN (HEADER + CONTENT)
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
        <ProgressHeader
          currentIndex={currentIndex}
          totalSteps={totalSteps}
          onBack={prev}
        />

        {/* ✅ CONTENT */}
          <div className={isFullWidth ? "w-full" : "max-w-4xl  flex-1 w-full mx-auto"}>
          {content}
          </div>
          <Image src="/Group.png" height={400} width={80} alt="l" className="absolute  top-30  right-10 h-[700px] object-contain"/>
      </div>
    </div>
  )
}
