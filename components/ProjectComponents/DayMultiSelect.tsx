/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const  DayMultiSelect=({
  question,
  update,
  next,
}: any)=> {
  const [selected, setSelected] = useState<string[]>(DAYS);

  const toggle = (day: string) => {
    setSelected((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

const handleContinue = () => {
  if (selected.length === 0) return;

  // ✅ save selected days
  update(question.id, selected);

  next();
};

  return (
    <div className="w-full  p-4">
      
      {/* Header */}
     <div className="flex flex-col justify-center items-center">
          <h2 className="text-[#191717] text-2xl font-semibold text-center">
        Which days don&apos;t work for you?
      </h2>
      <p className="mb-10 text-center text-[18px] leading-[26px] text-[#19171799]">
        We&apos;ll build your program around your schedule, not against it.
      </p>
     </div>

      {/* Days Grid */}
      <div className="grid grid-cols-2 gap-3">
        {DAYS.map((day) => {
          const isSelected = selected.includes(day);

          return (
            <button
              key={day}
              onClick={() => toggle(day)}
              className={`flex items-center cursor-pointer justify-between px-4 py-4 rounded-xl border transition-all
                ${
                  isSelected
                    ? "border-[#E9074B] bg-white"
                    : "border-gray-200 bg-gray-100"
                }
              `}
            >
              <span
                className={`font-medium ${
                  isSelected ? "text-black" : "text-gray-400"
                }`}
              >
                {day}
              </span>

              {/* Right Icon */}
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-full
                  ${
                    isSelected
                      ? "bg-[#E9074B]"
                      : "bg-gray-300"
                  }
                `}
              >
                {isSelected ? (
                  <Check className="w-3 h-3 text-white" />
                ) : (
                  <div className="w-2 h-2 bg-gray-500 rounded-full" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Info */}
      <div className="mt-6 text-center">
        <div className="rounded-full border border-blue-400 bg-blue-100 py-2 text-xs font-semibold text-blue-600">
          {selected.length} DAYS AVAILABLE FOR TRAINING
        </div>

        <p className="text-sm text-gray-500 mt-3 italic">
          “Got it. We&apos;ll never schedule you on those days.”
        </p>
      </div>

      {/* Button */}
      <button   onClick={handleContinue} className="mt-6 w-full max-w-100 cursor-pointer mx-auto flex items-center justify-center bg-[#E9074B] text-white py-3 rounded-xl font-semibold">
        Continue
      </button>
    </div>
  );
}

export default DayMultiSelect