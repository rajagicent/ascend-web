/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import { WeightProjectionChart } from "./WeightProjectionChart"
import { Info, LockKeyhole, MoveRight } from "lucide-react"

export const CheckpointScreen = ({ next }: any) => {
  return (
    <div className="flex min-h-screen justify-center p-4">
      {/* MAIN CONTAINER */}
      <div className="flex w-full flex-col justify-between">
        {/* CONTENT */}
        <div>
          {/* TITLE */}
          <h2 className="mb-2 text-2xl font-bold">
            Your Plan just got a lot more accurate, Alex.
          </h2>

          <p className="mb-6 text-gray-500">
            We now know your schedule, your equipment, and your physical
            profile.
          </p>

          {/* GRAPH CARD */}
          <div className="mb-6 rounded-2xl bg-white p-4 shadow">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs text-gray-500">WEIGHT PROJECTION</p>
              <span className="rounded-full bg-[#1E1E38] px-4 py-2 text-xs text-white">
                CONFIDENCE: HIGH
              </span>
            </div>

            <p className="mb-4 flex items-center gap-4 text-lg font-semibold">
              185.4 lbs <MoveRight />{" "}
              <span className="text-green-600">170.4 lbs</span>
            </p>

            {/* GRAPH PLACEHOLDER */}
            <div className="mb-2">
              <WeightProjectionChart />
            </div>

            <div className="flex justify-between text-xs text-gray-400">
              <span>WEEK 1</span>
              <span>WEEK 4</span>
              <span>WEEK 8</span>
              <span>WEEK 12</span>
            </div>
          </div>

          {/* STATS GRID */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <StatCard title="TO TARGET" value="15 lbs / week" highlight />
            <StatCardDate title="Goal Date" date="August 14, 2026" />
            <StatCard title="WEEKLY RATE" value="1.2 lbs / week" highlight />
            {/* ✅ locked prop added */}
            <StatCard title="TOTAL DURATION" locked />
          </div>

          {/* PLAN CARD */}
          <div className="mb-6 rounded-2xl bg-white p-4 shadow">
            <div className="mb-3 flex gap-2">
              <span className="rounded-full bg-[#E9074B] px-2 py-1.5 text-xs text-white">
                Commercial Gym
              </span>
              <span className="rounded-full bg-[#97C9FF29] px-4 py-1.5 text-xs text-blue-500">
                Advanced
              </span>
            </div>

            <p className="mb-3 text-xl font-semibold text-[#181831]">
              Your <span className="text-[#007AFF]">30 days</span> fat loss plan
              is taking shape.
            </p>

            <ul className="mb-4 space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#007AFF]" /> Barbell
                Squats
              </li>
              <li className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#007AFF]" /> Overhead
                Press
              </li>
              <li className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#007AFF]" /> Pull-ups
              </li>
            </ul>

            <div className="rounded-full w-fit px-10 mx-auto border justify-center flex items-center gap-4 bg-[#DF00001F] border-[#DF0000] py-2 text-center text-xs text-[#DF0000]">
              <Info size={16}/>
              Upgrade required for sets, reps and tempos
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={next}
          className="mx-auto flex w-full max-w-100 cursor-pointer items-center justify-center rounded-2xl bg-[#E9074B] py-6 text-lg text-white"
        >
          Complete My Profile
        </Button>
      </div>
    </div>
  )
}

const StatCard = ({
  title,
  value,
  highlight,
  locked,
}: {
  title: string
  value?: string
  highlight?: boolean
  locked?: boolean
}) => {
  return (
    <div
      className={`relative flex h-[110px] flex-col justify-between overflow-hidden rounded-[22px] border bg-white px-5 py-5 ${
        highlight ? "border-[#E9074B]" : "border-gray-200"
      }`}
    >
      {/* BLURRED CONTENT LAYER */}
      <div className={locked ? "opacity-40 blur-[3px] select-none" : ""}>
        <p className="text-[12px] font-semibold tracking-wide text-[#1C1C1E] uppercase">
          {title}
        </p>

        {!locked && value && (
          <div className="mt-1 flex items-baseline gap-1">
            <span
              className={`text-[34px] leading-none font-bold ${
                highlight ? "text-[#E9074B]" : "text-black"
              }`}
            >
              {value.split(" ")[0]}
            </span>
            <span className="text-[16px] text-[#1C1C1E]">
              {value.split(" ").slice(1).join(" ")}
            </span>
          </div>
        )}

        {/* Fake bars shown when locked (blurred behind the lock icon) */}
        {locked && (
          <div className="mt-3 flex items-end gap-1.5">
            {[18, 28, 22, 32, 26, 20].map((h, i) => (
              <div
                key={i}
                className="w-4 rounded-sm bg-gray-400"
                style={{ height: h }}
              />
            ))}
          </div>
        )}
      </div>

      {/* LOCK ICON — centered on top of blur */}
      {locked && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black shadow-lg">
            <LockKeyhole color="white" />
          </div>
        </div>
      )}
    </div>
  )
}
const StatCardDate = ({ title, date }: { title: string; date: string }) => {
  return (
    <div className="flex h-[110px] flex-col justify-between rounded-2xl border border-[#E9074B] p-5">
      <p className="text-[16px] font-bold tracking-wide text-gray-800 uppercase">
        {title}
      </p>
      <p className="text-lg font-bold tracking-wide text-[#E9074B] uppercase">
        {date}
      </p>
    </div>
  )
}
