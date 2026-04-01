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
  Dot,
} from "recharts";

const data = [
  { name: "Current", value: 80 },
  { name: "", value: 20 },
  { name: "", value: 20 },
  { name: "", value: 10 },
  { name: "Target Week", value: 50 },
];

export const InsightScreen = ({ next }: any) => {
  const [step, setStep] = useState<"intro" | "result">("intro")

  const data = [
    { label: "Estimated Goal Date" },
    { label: "Weekly Loss Rate" },
    { label: "Duration" },
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
            <h2 className="mb-2 text-[#191717] text-2xl font-semibold">
              Here&apos;s where you could be, Alex.
            </h2>

            <p className="mb-6 text-sm text-gray-500">
              Your personalized trajectory based on your target weight and
              health data.
            </p>

            {/* GRAPH CARD */}
              <WeightGraph/>

            {/* INFO BOX */}
            <div className="my-4 flex items-center justify-center gap-3 rounded-xl bg-[#E0EFFF] p-3 text-sm text-[#1E1E38]">
              <Image src="/vacation.png" alt="vacaion" height={30} width={30} />
              <span className="text-center text-[13px] md:text-[16px] leading-none font-bold text-[#1E1E38]">
                65 DAYS BEFORE YOUR VACATION
              </span>
            </div>

            {/* LOCKED STATS */}
            <div className="space-y-3">
              {data.map((item, index) => (
                <LockedItem key={index} label={item.label} />
              ))}
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

const LockedItem = ({ label }: { label: string }) => {
  return (
    <div className="flex w-full items-center justify-between rounded-[42px] border border-[#E6E2FF] bg-linear-to-r from-[#F1EFFE] to-white p-4">
      {/* Left Content */}
      <div className="flex w-full max-w-[400px] items-center gap-6 px-2 md:px-5">
        <span className="inline-block w-full max-w-100 text-[13px] font-medium whitespace-nowrap text-[#1E1E38]">
          {label}
        </span>

        {/* Blur / Hidden Data */}
        <div className="flex h-[21px] w-[100px] md:w-[300px] items-center justify-center rounded-md bg-[#E4E2F8]">
          <span className="text-xs text-[#6B6B9A]"></span>
        </div>
      </div>

      {/* Lock Icon */}
      <Image src="/lockone.png" height={20} width={20} alt="lock" />
    </div>
  )
}




const WeightGraph=()=> {
  return (
   <div className=" rounded-[32px] border border-gray-200 bg-white p-5 shadow-sm">
      
      {/* Chart */}
      <div className="h-50 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            
            {/* Grid lines */}
            <CartesianGrid stroke="#eee" vertical={false} />

            {/* Hide axis lines */}
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#6B7280" }}
            />
            <YAxis hide />

            {/* Line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#E9074B"
              strokeWidth={3}
              dot={<CustomDot dataLength={data.length} />}
              activeDot={false}
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Text */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400 tracking-wide">
          WEIGHT FORECAST
        </p>

        <h2 className="text-3xl font-semibold">
          <span className="text-black">15 lbs </span>
          <span className="text-blue-500">to go</span>
        </h2>
      </div>
    </div>
  );
}
const CustomDot = ({ cx, cy, index, dataLength }: any) => {
  // show only first & last dot
  if (index === 0 || index === dataLength - 1) {
    return <circle cx={cx} cy={cy} r={5} fill="#E9074B" />;
  }
  return null;
};