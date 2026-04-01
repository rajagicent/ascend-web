"use client";

import { Lock } from "lucide-react";

const weeks = [
  {
    id: 1,
    label: "Week 1-2",
    description: "Build a consistent Routine. Start forming a regular habit.",
    unlocked: true,
  },
  {
    id: 2,
    label: "Week 3-4",
    description: "Improve energy levels. Feel more active daily.",
    unlocked: false,
  },
  {
    id: 3,
    label: "Week 5-8",
    description: "Increase stamina and activity, build endurance and consistency.",
    unlocked: false,
  },
  {
    id: 4,
    label: "Week 9-12",
    description: "Establish a sustainable routine, maintain long-term healthy habits.",
    unlocked: false,
  },
];

export default function WeeklyPlan() {
  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white rounded-2xl shadow-lg p-5 w-full ">
        {weeks.map((week, index) => (
          <div key={week.id} className="flex gap-3">
            {/* Left timeline column */}
            <div className="flex flex-col items-center">
              {/* Icon / indicator */}
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 mt-0.5 ${
                  week.unlocked
                    ? "border-2 border-blue-500 bg-white"
                    : "bg-gray-100"
                }`}
              >
                {week.unlocked ? (
                  /* Blue ring with inner dot */
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
                )}
              </div>

              {/* Vertical connector line */}
              {index < weeks.length - 1 && (
                <div className="w-px flex-1 bg-gray-200 my-1" />
              )}
            </div>

            {/* Content */}
            <div className={`pb-5 flex-1 ${index === weeks.length - 1 ? "pb-0" : ""}`}>
              <p
                className={`text-sm font-semibold leading-snug ${
                  week.unlocked ? "text-gray-900" : "text-gray-300"
                }`}
              >
                {week.label}
              </p>
              <p
                className={`text-xs mt-0.5 leading-relaxed ${
                  week.unlocked ? "text-gray-500" : "text-gray-300"
                }`}
              >
                {week.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}