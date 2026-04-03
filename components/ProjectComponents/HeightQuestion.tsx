/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from "react"
import { useOnboarding } from "@/hooks/useOnboarding";
import { useSurveyRules, ValidationMessage } from "@/hooks/useSurveyRules";
import { Info, AlertCircle, CheckCircle2 } from "lucide-react";

export const HeightQuestion = ({
  question,
  value,
  update,
  next,
}: any) => {
  const [unit, setUnit] = useState<"Feet" | "Centimeter">("Feet");
  const [feetValue, setFeetValue] = useState("");
  const [inchesValue, setInchesValue] = useState("");
  const [cmValue, setCmValue] = useState("");

  const { state } = useOnboarding();
  const { evaluateRules } = useSurveyRules();
  const [msg, setMsg] = useState<ValidationMessage | null>(null);

  // 🔥 Hydrate from value prop
  useEffect(() => {
    if (value) {
      const cm = parseInt(value);
      if (cm > 0) {
        setCmValue(cm.toString());
        const totalFeet = cm / 30.48;
        const ft = Math.floor(totalFeet);
        const inc = Math.round((totalFeet - ft) * 12);
        setFeetValue(ft.toString());
        setInchesValue(inc.toString());
        setUnit("Centimeter");
      }
    }
  }, [value]);

  const handleToggle = (newUnit: "Feet" | "Centimeter") => {
    if (newUnit === unit) return;
    setUnit(newUnit);
  };

  const getFinalHeightInCm = () => {
    if (unit === "Centimeter") {
      return parseInt(cmValue) || 0;
    } else {
      const ft = parseInt(feetValue) || 0;
      const inc = parseInt(inchesValue) || 0;
      const totalFeet = ft + inc / 12;
      return Math.round(totalFeet * 30.48);
    }
  };

  // Evaluate rules instantly when metrics change
  useEffect(() => {
    const finalCm = getFinalHeightInCm();
    if (finalCm > 0) {
      const fieldId = question.field_id || question.id;
      const tempAnswers = { ...state.answers, [fieldId]: finalCm };
      const { message } = evaluateRules(question, finalCm, tempAnswers);
      setMsg(message);
    } else {
      setMsg(null);
    }
  }, [feetValue, inchesValue, cmValue, unit]);

  const handleContinue = () => {
    const finalCm = getFinalHeightInCm()

    if (!finalCm) {
      setMsg({ text: "Please enter your height to continue.", type: "warning", color: "red" });
      return;
    }

    const fieldId = question.field_id || question.id;
    const tempAnswers = { ...state.answers, [fieldId]: finalCm };
    const { isValid, message } = evaluateRules(question, finalCm, tempAnswers);

    if (!isValid) {
      setMsg(message);
      return;
    }

    // 🔥 Save in global state
    update(fieldId, finalCm)

    // 🔥 Move to next step
    next()
  }
  
  const handleFeetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // allow only numbers
    if (!/^\d*$/.test(val)) return
    setFeetValue(val)
  }

  const handleInchesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (!/^\d*$/.test(val)) return
    setInchesValue(val)
  }

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
      <div className={`mt-2 mb-4 flex items-start w-full max-w-sm mx-auto justify-center gap-3 rounded-xl border ${borderColor} ${bgColor} p-4 text-sm font-medium ${iconColor.replace('text', 'text').replace('500', '700')}`}>
        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconColor}`} />
        <p className="leading-relaxed">{msg.text}</p>
      </div>
    );
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-60px)] w-full max-w-sm flex-col items-center p-4 md:min-h-[calc(100vh-200px)]">
      <div className="flex-1 w-full">
        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-[#191717]">
          {question.label}
        </h2>
        <p className="mb-10 text-center text-[18px] leading-[26px] text-[#19171799]">
          {question.subLabel}
        </p>

        {/* Toggle */}
        <div className="mb-10 flex w-full rounded-full bg-[#F1F4F9] p-1">
          <button
            onClick={() => handleToggle("Feet")}
            className={`flex-1 rounded-full cursor-pointer py-2 font-medium ${
              unit === "Feet" ? "bg-white text-[#E9074B] shadow-md" : "text-gray-400"
            }`}
          >
            Feet 
          </button>

          <button
            onClick={() => handleToggle("Centimeter")}
            className={`flex-1 rounded-full cursor-pointer py-2 font-medium ${
              unit === "Centimeter" ? "bg-white text-[#E9074B] shadow-md" : "text-gray-400"
            }`}
          >
          CM
          </button>
        </div>

        <div className="mx-auto flex w-full justify-center">
          {/* Inputs */}
          {unit === "Feet" ? (
            <div className="mb-6 flex gap-4">
              <input
                type="text"
                value={feetValue}
                onChange={handleFeetChange}
                className="h-20 w-20 rounded-xl border text-center text-2xl outline-none focus:border-[#E9074B] focus:ring-1 focus:ring-[#E9074B]"
                placeholder="Ft"
                maxLength={2}
              />
              <input
                type="text"
                value={inchesValue}
                onChange={handleInchesChange}
                className="h-20 w-20 rounded-xl border text-center text-2xl outline-none focus:border-[#E9074B] focus:ring-1 focus:ring-[#E9074B]"
                placeholder="In"
                maxLength={2}
              />
            </div>
          ) : (
            <input
              type="text"
              value={cmValue}
              onChange={(e) => {
                const val = e.target.value;
                if (!/^\d*$/.test(val)) return;
                setCmValue(val);
              }}
              className="mb-6 h-20 w-24 rounded-xl border text-center text-2xl outline-none focus:border-[#E9074B] focus:ring-1 focus:ring-[#E9074B]"
              placeholder="Cm"
              maxLength={3}
            />
          )}
        </div>
        
        {renderMessage()}
      </div>

      <button
        onClick={handleContinue}
        className="w-full cursor-pointer rounded-2xl bg-[#E9074B] py-4 font-bold text-white transition-all active:scale-[0.98] mt-4"
      >
        Continue
      </button>
    </div>
  )
}
