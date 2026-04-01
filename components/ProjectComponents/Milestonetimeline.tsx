"use client"

import Image from "next/image"

const milestones = [
  { week: "WEEK 1-2", label: "Build Consistency", active: true },
  { week: "WEEK 3-4", label: "Improve stamina", active: false },
  { week: "WEEK 5-8", label: "increase activity", active: false },
  { week: "WEEK 9-12", label: "Sustainable Routine", active: false },
]

export default function MilestoneTimeline() {
  return (
    <div className="mb-8 flex items-center justify-center">
      <div className="relative w-full rounded-2xl border-[#E5E5EF91] px-2 py-8 shadow md:px-10">
        {/* Phase badge */}
        <div className="flex border-b pb-4">
          <div
            className="absolute top-4 right-4 flex items-center gap-2 rounded-lg px-3 py-2 leading-tight text-white"
            style={{ background: "#1a1a3e", fontSize: "10px", fontWeight: 700 }}
          >
            <Image src="/flag.svg" alt="calendar" height={12} width={12} />
            <div className="flex flex-wrap gap-2 text-xs font-medium">
              <div>PHASE 1:</div>
              <div>FOUNDATION</div>
            </div>
          </div>

          {/* Title */}
          <p
            className="text-center text-gray-400 uppercase"
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em" }}
          >
            Milestone Timeline
          </p>
        </div>

        <div className="relative mt-8 px-4">
          <div className="absolute top-[67px] left-0 h-[2px] w-full bg-gray-200" />

          {/* 🔥 ACTIVE GREEN LINE (only till active index) */}
          <div
            className="absolute top-[67px] left-0 h-[2px] bg-green-600 transition-all"
            style={{
              width: `${(milestones.findIndex((m) => m.active) / (milestones.length - 1)) * 100}%`,
            }}
          />

          {/* ITEMS */}
          <div className="flex justify-between">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="relative flex w-full flex-col items-center"
              >
                {/* DOT */}
                <div
                  className={`z-10 h-5 w-5 rounded-full ${
                    m.active
                      ? "bg-[#E9074B] shadow-[0_0_0_6px_rgba(233,7,75,0.15)]"
                      : "bg-gray-300"
                  }`}
                />

                {/* DASHED LINE */}
                <div
                  className={`h-7 border-l-2 border-dashed ${
                    m.active ? "border-[#E9074B]" : "border-gray-300"
                  }`}
                />

                {/* WEEK */}
                <div className="flex flex-col items-center">
                  <span
                    className={`text-[10px] font-bold tracking-wider ${
                      m.active ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {m.week}
                  </span>

                  {/* GREEN UNDERLINE (only active) */}
                  {m.active && (
                    <div className="mt-1 h-[2px] w-16 rounded-full bg-green-600" />
                  )}
                </div>

                {/* LABEL */}
                <span
                  className={`mt-3 max-w-[65px] text-center text-[11px] leading-tight break-words ${
                    m.active ? "font-semibold text-black" : "text-gray-400"
                  }`}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
