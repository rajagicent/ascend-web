/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import Image from "next/image"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts"
import WeeklyPlan from "./Weeklyplan"

const data = [
  { name: "WEEK", value: 80 },
  { name: "WEEK", value: 70 },
  { name: "WEEK", value: 50 },
  { name: "WEEK", value: 25 },
  { name: "WEEK", value: 10 },
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
            <WeightGraph />
            {/* <WeeklyPlan/> */}

            {/* INFO BOX */}
            <div className="my-4 flex items-center justify-center gap-3 rounded-xl bg-[#E0EFFF] p-3 text-sm text-[#1E1E38]">
              <Image src="/dumbell.png" alt="vacaion" height={40} width={40} />
              <span className="text-center text-[13px] leading-none font-bold text-[#1E1E38] md:text-[16px]">
                5 lb muscle gain target
              </span>
            </div>

           <div className="border rounded-2xl p-4">
             {/* LOCKED STATS */}
            <p className=" text-lg font-bold mb-4 px-2  text-[#121222]">Premium insights</p>
            <div className="space-y-3">
              {data.map((item, index) => (
                <div key={index} className="flex items-center justify-between pr-4">
                  <div className="flex gap-2 items-center">
                    {" "}
                    <Image
                      src={item.image}
                      alt={item.label}
                      height={40}
                      width={40}
                    />
                    <p>{item.label  }</p>
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

const WeightGraph = () => {
  return (
    <div className="rounded-[32px] border border-gray-200 bg-white p-5 shadow-sm">
      {/* Bottom Text */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-[#9291A5]">Current</p>
          <p className="text-base font-bold text-[#1E1B39]">165 lb</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-[#E9074B]">Target Goal</p>
          <p className="text-base font-bold text-[#FF2C6C]">165 lb</p>
        </div>
      </div>
      {/* Chart */}
      <div className="h-50 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorShadow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E9074B" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#E9074B" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <CartesianGrid stroke="#eee" vertical={false} />

            {/* Hide axis lines */}
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#6B7280" }}
            />
            <YAxis hide domain={["dataMin", "dataMax"]} />
            <Area
              type="natural"
              dataKey="value"
              stroke="none"
              fill="url(#colorShadow)"
              fillOpacity={1}
              baseValue="dataMin"
            />

            {/* Line */}
            <Line
              type="natural"
              dataKey="value"
              stroke="#E9074B"
              strokeWidth={3}
              dot={<CustomDot dataLength={data.length} />}
              // activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
const CustomDot = ({ cx, cy, index, dataLength }: any) => {
  // show only first & last dot
  if (index === 0 || index === dataLength - 1) {
    return <circle cx={cx} cy={cy} r={5} fill="#E9074B" />
  }
  return null
}
