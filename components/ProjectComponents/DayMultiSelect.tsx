/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DayMultiSelect = ({
  question,
  value,
  update,
  next,
}: any) => {
  const [selected, setSelected] = useState<string[]>(() => {
    if (!value) return DAYS;
    if (Array.isArray(value)) return value;
    if (typeof value === "string") return value.split(", ").map(s => s.trim());
    return DAYS;
  });

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
  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all
    ${
      isSelected
        ? "border-gray-300 bg-gray-100"
        : "border-red-300 bg-red-50"
    }
  `}
>
  {/* Left */}
  <div className="flex flex-col items-start">
    <span className="font-medium text-sm text-black">
      {day}
    </span>

    <span
      className={`text-xs font-medium ${
        isSelected ? "text-[#006E1C]" : "text-[#E9074B]"
      }`}
    >
      {isSelected ? "Available" : "Rest Day"}
    </span>
  </div>

  {/* Right Icon */}
  <div
    className={`w-5 h-5 flex items-center justify-center rounded-full
      ${isSelected ? "bg-[#006E1C]" : "bg-[#E9074B]"}
    `}
  >
    {isSelected ? (
      <Check className="w-3 h-3 text-white" />
    ) : (
      <span className="text-white text-xs">✕</span>
    )}
  </div>
</button>
          );
        })}
      </div>

      {/* Bottom Info */}
      <div className="mt-6 text-center">
        <div className="rounded-full border border-[#8DC4FF] bg-[#E9F3FF] py-2 text-xs font-semibold text-[#2274F9]">
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