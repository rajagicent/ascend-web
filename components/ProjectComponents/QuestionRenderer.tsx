/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"


import { useState, useEffect } from "react";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useSurveyRules, ValidationMessage } from "@/hooks/useSurveyRules";
import { Info, AlertCircle, CheckCircle2 } from "lucide-react";

export default function QuestionRenderer({
  question,
  value,
  update,
  next,
}: any) {
  const [localValue, setLocalValue] = useState<any>(value || (question.selection === "multiple" ? [] : ""));
  const { state, questionsMap } = useOnboarding();
  const { evaluateRules, checkConstraints } = useSurveyRules();
  const [msg, setMsg] = useState<ValidationMessage | null>(null);

  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);

  // Evaluate rules instantly when localValue changes to provide feedback
  useEffect(() => {
    if (!localValue || (Array.isArray(localValue) && localValue.length === 0)) {
      setMsg(null);
      return;
    }
    const fieldId = question.field_id || question.id;
    const tempAnswers = { ...state.answers, [fieldId]: localValue };
    const { message } = evaluateRules(question, localValue, tempAnswers);
    setMsg(message);
  }, [localValue]);

  const handleNext = () => {
    const fieldId = question.field_id || question.id;
    const tempAnswers = { ...state.answers, [fieldId]: localValue };
    const { isValid, message } = evaluateRules(question, localValue, tempAnswers);
    if (!isValid) {
      setMsg(message);
      return;
    }
    next();
  };

  const renderMessage = () => {
    if (!msg) return null;
    
    let bgColor = "bg-blue-50";
    let iconColor = "text-blue-500";
    let Icon = Info;
    let borderColor = "border-blue-200";

    if (msg.color === "red") {
      bgColor = "bg-red-50";
      iconColor = "text-red-500";
      borderColor = "border-red-200";
      Icon = AlertCircle;
    } else if (msg.color === "green") {
      bgColor = "bg-green-50";
      iconColor = "text-green-500";
      borderColor = "border-green-200";
      Icon = CheckCircle2;
    }

    return (
      <div className={`mt-6 mb-2 flex items-start gap-3 rounded-xl border ${borderColor} ${bgColor} p-4 text-sm font-medium ${iconColor.replace('text', 'text').replace('500', '700')}`}>
        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconColor}`} />
        <p className="leading-relaxed">{msg.text}</p>
      </div>
    );
  };

  if (!question.options || question.options.length === 0) {
    // Basic Input fallback
    return (
      <div className="mx-auto max-w-5xl p-6">
        <h2 className="text-center text-[#191717] text-2xl font-bold mb-2">
          {question.label}
        </h2>
        {question.subLabel && (
          <p className="mb-10 text-center text-[18px] leading-6.5 text-[#19171799]">
            {question.subLabel}
          </p>
        )}
        <div className="mx-auto max-w-md">
          <input
            type="text"
            className="w-full rounded-xl border p-4 text-lg outline-none focus:border-[#E9074B] focus:ring-1 focus:ring-[#E9074B] transition-all"
            value={localValue || ""}
            placeholder={question.placeholder || "Type here..."}
            onChange={(e) => {
              const val = e.target.value;
              setLocalValue(val);
              update(question.field_id || question.id, val);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleNext();
            }}
          />
          {renderMessage()}
          <button
            onClick={handleNext}
            className="mt-6 w-full bg-[#E9074B] hover:bg-[#d60644] text-white py-4 rounded-2xl font-semibold transition-all active:scale-[0.98]"
          >
            Continue
          </button>
        </div>
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
    // Check constraints before allowing selection
    const constraint = checkConstraints(question.id, val, state.answers, questionsMap);
    if (!constraint.allowed) {
      setMsg({ text: constraint.reason || "Selection not permitted based on previous choices.", type: "warning", color: "red" });
      return;
    }

    if (question.selection === "multiple") {
      const current = Array.isArray(localValue) ? localValue : [];
      const newValue = current.includes(val)
        ? current.filter((v: any) => v !== val)
        : [...current, val];
      setLocalValue(newValue);
      update(question.field_id || question.id, newValue);
    } else {
      setLocalValue(val);
      update(question.field_id || question.id, val);
      
      if (question.autoNext) {
        const fieldId = question.field_id || question.id;
        const tempAnswers = { ...state.answers, [fieldId]: val };
        const { isValid, message } = evaluateRules(question, val, tempAnswers);
        if (!isValid) {
          setMsg(message);
          return;
        }
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
              className={`mb-2 w-full text-start cursor-pointer rounded-xl p-4 transition-all ${
                active 
                  ? "bg-[#E9074B] text-white shadow-lg shadow-[#E9074B40] scale-[1.02]" 
                  : "bg-[#F0F0F0]/60 text-[#191717] hover:bg-gray-100 border border-transparent"
              }`}
               onClick={() => handleSelect(val)}
            >
              <span className="font-medium text-[16px]">{label}</span>
            </button>
          );
        })}
      </div>

      {renderMessage()}

      {(question.selection === "multiple" || !question.autoNext) && (
        <button
          onClick={handleNext}
          disabled={question.selection === "multiple" && (!localValue || localValue.length === 0)}
          className="mt-8 w-full max-w-md mx-auto block bg-[#E9074B] hover:bg-[#d60644] text-[18px] text-white py-4 rounded-2xl font-semibold disabled:opacity-50 transition-all active:scale-[0.98]"
        >
          Continue
        </button>
      )}
    </div>
  );
}
