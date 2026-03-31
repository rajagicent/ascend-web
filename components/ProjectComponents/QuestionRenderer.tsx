/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react";

export default function QuestionRenderer({
  question,
  value,
  update,
  next,
}: any) {
  const [localValue, setLocalValue] = useState<any>(value || (question.selection === "multiple" ? [] : ""));

  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);

  if (!question.options) {
    // Basic Input fallback
    return (
      <div className="mx-auto max-w-xl p-6">
        <h2 className="text-center text-[#191717] text-2xl font-bold mb-4">
          {question.label}
        </h2>
        <input
          type="text"
          className="w-full rounded-xl border p-4 text-lg"
          value={localValue || ""}
          onChange={(e) => {
            const val = e.target.value;
            setLocalValue(val);
            update(question.id, val);
          }}
          onKeyDown={(e) => e.key === "Enter" && next()}
        />
        <button
          onClick={next}
          className="mt-6 w-full bg-[#E9074B] text-white py-4 rounded-2xl font-semibold"
        >
          Continue
        </button>
      </div>
    );
  }

  const isSelected = (val: any) => {
    if (question.selection === "multiple") {
      return Array.isArray(localValue) && localValue.includes(val);
    }
    return localValue === val;
  };

  const handleSelect = (val: any) => {
    if (question.selection === "multiple") {
      const current = Array.isArray(localValue) ? localValue : [];
      const newValue = current.includes(val)
        ? current.filter((v: any) => v !== val)
        : [...current, val];
      setLocalValue(newValue);
      update(question.id, newValue);
    } else {
      setLocalValue(val);
      update(question.id, val);
      if (question.autoNext) {
        next();
      }
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h2 className="text-center text-2xl font-bold text-[#191717]">
        {question.label}
      </h2>

      <p className="mb-10 text-center text-[18px] leading-6.5 text-[#19171799]">
        {question.subLabel}
      </p>

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        {question.options.map((opt: any) => {
          const label = typeof opt === "string" ? opt : opt.label;
          const val = typeof opt === "string" ? opt : opt.value;
          const active = isSelected(val);

          return (
            <button
              key={val}
              className={`mb-2 w-full text-start cursor-pointer rounded p-3 transition-colors ${
                active 
                  ? "bg-[#E9074B] text-white shadow-md shadow-[#E9074B22]" 
                  : "bg-[#F0F0F0]/40 text-[#191717] hover:bg-gray-100"
              }`}
              onClick={() => handleSelect(val)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {(question.selection === "multiple" || !question.autoNext) && (
        <button
          onClick={next}
          disabled={question.selection === "multiple" && (!localValue || localValue.length === 0)}
          className="mt-10 w-full max-w-md mx-auto block bg-[#E9074B] text-white py-4 rounded-2xl font-semibold disabled:opacity-50"
        >
          Continue
        </button>
      )}
    </div>
  );
}
