import { useState } from "react"
import Image from "next/image"

import WeightGraph from "./WeightGraph"
import WeeklyPlan from "./Weeklyplan"
import { CalendarIcon } from "lucide-react"
import { useOnboarding } from "@/hooks/useOnboarding"

export const InsightScreen = ({ next }: any) => {
  const [step, setStep] = useState<"intro" | "result">("intro")
  const { state, questionsMap } = useOnboarding()

  const currentWeight = Number(state.answers["weight"]) || 0
  const targetWeight = Number(state.answers["target_weight"]) || 0

  const graphData = [
    { name: "Now", value: currentWeight },
    { name: "W2", value: currentWeight + (targetWeight - currentWeight) * 0.2 },
    { name: "W4", value: currentWeight + (targetWeight - currentWeight) * 0.5 },
    { name: "W6", value: currentWeight + (targetWeight - currentWeight) * 0.8 },
    { name: "Goal", value: targetWeight },
  ]

  const data = [
    { label: "Estimated Goal Date", image: "/freq.png" },
    { label: "Weekly Loss Rate", image: "/rate.png" },
    { label: "Duration", image: "/duration.png" },
  ]

  

  // Check if the goal is "Get healthier"
  const isHealthyGoal = state.answers["goal"] === "GOAL_004"
  
  // Event parsing
  const eventData = state.answers["event"] || {}
  const eventId = typeof eventData === "object" ? eventData.event : eventData
  const eventDate = eventData?.date ? new Date(eventData.date) : null
  
  const eventQ = state.answers["goal"] === "GOAL_001" ? state.answers["motivation_fat_loss"] : state.answers["motivation_muscle"]
  
  const eventLabel = questionsMap["event"]?.options?.find((o: any) => o.value === eventId)?.label
  

  let daysUntil 
  if (eventDate) {
    const diffTime = eventDate.getTime() - new Date().getTime()
    daysUntil = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
  }

  return (
    <div className="flex flex-col justify-between p-6">
      {/* ================= STEP 1 ================= */}
      {step === "intro" && (
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border p-10 text-center">
            <div className="mb-6">
              <Image src="/analysis.png" alt="anlyisi" height={80} width={80} />
            </div>

            <h2 className="mb-3 text-[22px] leading-tight font-medium text-[#191717]">
              Personalized Analysis Complete
            </h2>

            <p className="mb-6 text-sm leading-snug text-[#19171799]">
              We’ve calculated your metabolic baseline and projected your target
              timeline based on your body metrics and goal.
            </p>
          </div>

          <button
            onClick={() => setStep("result")}
            className="mx-auto mt-6 w-fit max-w-100 cursor-pointer rounded-2xl bg-[#E9074B] px-20 py-4 text-white"
          >
            Show me Results
          </button>
        </div>
      )}

      {/* ================= STEP 2 ================= */}
      {step === "result" && (
        <div className="flex h-full flex-col justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-[#191717]">
              Here&apos;s where you could be{state.answers["name"] ? `, ${state.answers["name"]}` : ""}.
            </h2>

            <p className="mb-6 text-sm text-gray-500">
              Your personalized trajectory based on your target and
              health data.
            </p>

            {/* CONDITIONAL RENDER: Graph vs Plan */}
            {isHealthyGoal ? (
              <div className="mb-6">
                <WeeklyPlan />
              </div>
            ) : (
              <WeightGraph
                data={graphData}
                current={state.answers["weight"] + " " + "kg"}
                target={state.answers["target_weight"] + " " + "kg"}
                variant="simple"
              />
            )}

            {/* INFO BOX */}
            <div className="my-4 flex items-center justify-center gap-3 rounded-xl bg-[#E0EFFF] p-3 text-sm text-[#1E1E38]">
              <Image src="/dumbell.png" alt="vacaion" height={40} width={40} />
              <span className="text-center text-[13px] leading-none font-bold text-[#1E1E38] md:text-[16px]">
                {isHealthyGoal 
                  ? "Optimal Health Sequence" 
                  : `${Math.abs(Number(state.answers["weight"]) - Number(state.answers["target_weight"]))} kg ${state.answers["goal"] === "GOAL_002" ? "muscle gain" : "fat loss"} target`}
              </span>
            </div>

            <div className="relative h-[125px] w-full mb-4 overflow-hidden rounded-[17px] border border-[#F2F1FF] bg-white">
              <div className="absolute top-3 left-4 flex flex-row items-center gap-[9px]">
                <Image src="/calender.png" alt="freq" height={30} width={30} />
                <span className="font-sans text-[15px] leading-[108%] font-medium tracking-[-0.01em] whitespace-nowrap text-[#9291A5]">
                  UPCOMING MILESTONE
                </span>
              </div>

              <p className="absolute top-[50px] left-6 text-[18px] leading-7 font-bold tracking-normal text-[#1E1B39] uppercase pr-4">
                {isHealthyGoal 
                  ? "Build sustainable habits to improve longevity"
                  : `${state.answers["goal"] === "GOAL_002" ? "Gain" : "Lose"} ${Math.abs(Number(state.answers["weight"]) - Number(state.answers["target_weight"]))} kg ${daysUntil?  "in" + " " +  daysUntil + " " + "days before your"+ " " + eventLabel : ""}`
                }
              </p>
            </div>

            <div className="rounded-2xl border p-4">
              {/* LOCKED STATS */}
              <p className="mb-4 px-2 text-lg font-bold text-[#121222]">
                Premium insights
              </p>
              <div className="space-y-3">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between pr-4"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={item.image}
                        alt={item.label}
                        height={40}
                        width={40}
                      />
                      <p>{item.label}</p>
                    </div>
                    <Image
                      src="/lock.png"
                      alt={item.label}
                      height={25}
                      width={25}
                      className=""
                    />
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              Make My Plan More Accurate
            </p>
          </div>

          <button
            onClick={next}
            className="mx-auto mt-6 w-full max-w-100 cursor-pointer rounded-2xl bg-[#E9074B] px-20 py-3 text-white"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}
