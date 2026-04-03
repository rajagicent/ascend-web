/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Check, Info, AlertCircle, CheckCircle2 } from "lucide-react";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useSurveyRules, ValidationMessage } from "@/hooks/useSurveyRules";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DayMultiSelect = ({
  question,
  value,
  update,
  next,
}: any) => {
  const { state } = useOnboarding();
  const { evaluateRules } = useSurveyRules();
  const [msg, setMsg] = useState<ValidationMessage | null>(null);

  const [selected, setSelected] = useState<string[]>(() => {
    if (!value) return DAYS;
    if (Array.isArray(value)) return value;
    if (typeof value === "string") return value.split(", ").map(s => s.trim());
    return DAYS;
  });

  useEffect(() => {
    const fieldId = question.field_id || question.id;
    const tempAnswers = { ...state.answers, [fieldId]: selected };
    const { message } = evaluateRules(question, selected, tempAnswers);
    setMsg(message);
  }, [selected]);

  const toggle = (day: string) => {
    setSelected((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const handleContinue = () => {
    if (selected.length === 0) return;
    update(question.field_id || question.id, selected);
    next();
  };

  const renderMessage = () => {
    if (!msg) return null;
    
    let bgColor = "bg-blue-50";
    let iconColor = "text-blue-500";
    let borderColor = "border-blue-200";

    if (msg.color === "red") {
      bgColor = "bg-red-50";
      iconColor = "text-red-500";
      borderColor = "border-red-200";
    }

    return (
      <div className={`mt-6 flex items-start gap-3 rounded-xl border ${borderColor} ${bgColor} p-4 text-sm font-medium ${iconColor.replace('text', 'text').replace('500', '700')}`}>
        <p className="text-center w-full italic">“{msg.text}”</p>
      </div>
    );
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-[#191717] text-2xl font-semibold text-center">
          {question.label}
        </h2>
        <p className="mb-10 text-center text-[18px] leading-[26px] text-[#19171799]">
          {question.subLabel}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {DAYS.map((day) => {
          const isSelected = selected.includes(day);

          return (
            <button
              key={day}
              onClick={() => toggle(day)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all
                ${isSelected ? "border-gray-300 bg-gray-100" : "border-red-300 bg-red-50"}
              `}
            >
              <div className="flex flex-col items-start text-left">
                <span className="font-medium text-sm text-black">{day}</span>
                <span className={`text-xs font-medium ${isSelected ? "text-[#006E1C]" : "text-[#E9074B]"}`}>
                  {isSelected ? "Available" : "Rest Day"}
                </span>
              </div>
              <div className={`w-5 h-5 flex items-center justify-center rounded-full ${isSelected ? "bg-[#006E1C]" : "bg-[#E9074B]"}`}>
                {isSelected ? <Check className="w-3 h-3 text-white" /> : <span className="text-white text-xs">✕</span>}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <div className="rounded-full border border-[#8DC4FF] bg-[#E9F3FF] py-2 text-xs font-semibold text-[#2274F9]">
          {selected.length} DAYS AVAILABLE FOR TRAINING
        </div>
        {renderMessage()}
      </div>

      {/* Button */}
      <button   onClick={handleContinue} className="mt-6 w-full max-w-100 cursor-pointer mx-auto flex items-center justify-center bg-[#E9074B] text-white py-3 rounded-xl font-semibold">
        Continue
      </button>
    </div>
  );
}

export default DayMultiSelect