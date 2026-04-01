/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import Image from "next/image"

import WeightGraph from "./WeightGraph"
import { CalendarIcon } from "lucide-react"

const graphData = [
  { name: "W1", value: 80 },
  { name: "W2", value: 70 },
  { name: "W3", value: 50 },
  { name: "W4", value: 25 },
  { name: "W5", value: 10 },
]

export const InsightScreen = ({ next }: any) => {
  const [step, setStep] = useState<"intro" | "result">("intro")

  const data = [
    { label: "Estimated Goal Date", image: "/freq.png" },
    { label: "Weekly Loss Rate", image: "/rate.png" },
    { label: "Duration", image: "/duration.png" },
  ]

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
              weight timeline
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
              Here&apos;s where you could be, Alex.
            </h2>

            <p className="mb-6 text-sm text-gray-500">
              Your personalized trajectory based on your target weight and
              health data.
            </p>

            {/* GRAPH CARD */}
            {/* <WeightGraph data={graphData} current="165 lb" target="150 lb" /> */}
            <WeightGraph
              data={graphData}
              current="150 lb"
              target="165 lb"
              variant="simple"
            />

            {/* <WeeklyPlan/> */}

            {/* INFO BOX */}
            <div className="my-4 flex items-center justify-center gap-3 rounded-xl bg-[#E0EFFF] p-3 text-sm text-[#1E1E38]">
              <Image src="/dumbell.png" alt="vacaion" height={40} width={40} />
              <span className="text-center text-[13px] leading-none font-bold text-[#1E1E38] md:text-[16px]">
                5 lb muscle gain target
              </span>
            </div>

            <div className="relative h-[125px] w-full mb-4 overflow-hidden rounded-[17px] border border-[#F2F1FF] bg-white">
              {/* Header row: icon + label */}
              <div className="absolute top-3 left-4 flex flex-row items-center gap-[9px]">
                {/* <CalendarIcon /> */<Image src="/calender.png" alt="freq" height={30} width={30} />}
                <span className="font-sans text-[15px] leading-[108%] font-medium tracking-[-0.01em] whitespace-nowrap text-[#9291A5]">
                  UPCOMING MILESTONE
                </span>
              </div>

              {/* Title line 1 */}
              <p className="absolute top-[50px] left-6  text-[19.74px] leading-7 font-bold tracking-normal whitespace-nowrap text-[#1E1B39] uppercase">
                Lose 5 lbs in 65 days before your vacation
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
                      {" "}
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
