/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { useOnboarding } from "@/hooks/useOnboarding";
import { useSurveyRules, ValidationMessage } from "@/hooks/useSurveyRules";
import { Info, AlertCircle, CheckCircle2 } from "lucide-react";

const lbsToKg = (lbs: number) => lbs / 2.20462;
const kgToLbs = (kg: number) => kg * 2.20462;

const WeightQuestion = ({
  question,
  value,
  update,
  next,
  min = 80,
  max = 500,
}: any) => {
  const [unit, setUnit] = useState<"LBS" | "KG">("LBS")

  const [currentValue, setCurrentValue] = useState(0) // stored in LBS
  const [inputValue, setInputValue] = useState("0.0")
  const [isDragging, setIsDragging] = useState(false)
  const [hasSelected, setHasSelected] = useState(false)

  const { state } = useOnboarding();
  const { evaluateRules } = useSurveyRules();
  const [msg, setMsg] = useState<ValidationMessage | null>(null);

  // 🔥 Hydrate from value prop
  useEffect(() => {
    if (value) {
      const kg = parseFloat(value);
      if (kg > 0) {
        const lbs = kgToLbs(kg);
        setCurrentValue(lbs);
        setInputValue(kg.toString());
        setUnit("KG");
        setHasSelected(true);
      }
    }
  }, [value]);

  const dragStartPos = useRef(0)
  const dragStartValue = useRef(0)

  const pixelsPerUnit = 120
  const ticksPerUnit = 10

  const getDisplayValue = () => {
    return unit === "KG" ? lbsToKg(currentValue) : currentValue
  }

  // 🔥 FINAL VALUE (always store in KG)
  const getFinalWeightInKg = () => {
    return Math.round(lbsToKg(currentValue))
  }

  // Evaluate rules instantly when metrics change
  useEffect(() => {
    if (hasSelected) {
      const finalKg = getFinalWeightInKg();
      const fieldId = question.field_id || question.id;
      const tempAnswers = { ...state.answers, [fieldId]: finalKg };
      const { message } = evaluateRules(question, finalKg, tempAnswers);
      setMsg(message);
    }
  }, [currentValue, hasSelected]);

  // ===== UPDATE =====
  const updateValue = useCallback(
    (newValue: number, fromInput = false) => {
      setHasSelected(true) // ✅ user interacted

      const valueInLbs = unit === "KG" ? kgToLbs(newValue) : newValue

      const clamped = Math.max(
        min,
        Math.min(max, Math.round(valueInLbs * 10) / 10)
      )

      setCurrentValue(clamped)

      const displayVal = unit === "KG" ? lbsToKg(clamped) : clamped

      if (!fromInput) {
        setInputValue(displayVal.toFixed(1))
      }
    },
    [unit, min, max]
  )

  // ===== TOGGLE =====
  const handleToggle = (newUnit: "LBS" | "KG") => {
    if (newUnit === unit) return

    const converted =
      newUnit === "KG"
        ? lbsToKg(currentValue)
        : kgToLbs(parseFloat(inputValue) || 0)

    setUnit(newUnit)
    setInputValue(converted.toFixed(1))
  }

  // ===== INPUT =====
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value

    if (val !== "" && !/^\d*\.?\d*$/.test(val)) return

    setInputValue(val)

    const parsed = parseFloat(val)
    if (!isNaN(parsed)) {
      updateValue(parsed, true)
    }
  }

  // ===== DRAG =====
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragStartPos.current = e.clientX
    dragStartValue.current = getDisplayValue()
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - dragStartPos.current
      const deltaValue = deltaX / pixelsPerUnit

      updateValue(dragStartValue.current - deltaValue)
    },
    [isDragging, updateValue]
  )

  const handleEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleEnd)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleEnd)
    }
  }, [isDragging, handleMouseMove, handleEnd])

  // ===== CONTINUE BUTTON FIXED 🔥 =====
  const handleContinue = () => {
    const finalKg = getFinalWeightInKg()

    if (!finalKg) {
      setMsg({ text: "Please enter your weight.", type: "warning", color: "red" });
      return;
    }

    const fieldId = question.field_id || question.id;
    const tempAnswers = { ...state.answers, [fieldId]: finalKg };
    const { isValid, message } = evaluateRules(question, finalKg, tempAnswers);

    if (!isValid) {
      setMsg(message);
      return;
    }

    // ✅ save globally
    update(fieldId, finalKg)

    // ✅ go next
    next()
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
      <div className={`mt-6 mb-4 flex items-start w-full max-w-[400px] gap-3 rounded-xl border ${borderColor} ${bgColor} p-4 text-sm font-medium ${iconColor.replace('text', 'text').replace('500', '700')}`}>
        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconColor}`} />
        <p className="leading-relaxed">{msg.text}</p>
      </div>
    );
  };

  // ===== UI =====
  const renderMarks = () => {
    const marks = []
    const range = 6

    const displayValue = getDisplayValue()
    const start = Math.floor(displayValue - range)
    const end = Math.ceil(displayValue + range)

    for (let i = start * ticksPerUnit; i <= end * ticksPerUnit; i++) {
      const val = i / ticksPerUnit
      const isMajor = i % ticksPerUnit === 0
      const offset = (val - displayValue) * pixelsPerUnit

      marks.push(
        <div
          key={i}
          className="absolute top-0 flex h-full flex-col items-center"
          style={{ left: `calc(50% + ${offset}px)` }}
        >
          <div className={`bg-white ${isMajor ? "h-10 w-0.5" : "h-4 w-px"}`} />
          {isMajor && (
            <span className="mt-2 text-[10px] text-white">{val}</span>
          )}
        </div>
      )
    }

    return marks
  }

  return (
    <div className="flex min-h-[calc(100vh-60px)] w-full flex-col items-center py-10 md:min-h-[calc(100vh-200px)]">
      <div className="flex-1 w-full">
       <div className="text-center flex justify-center items-center flex-col p-4">
         <h2 className="text-center text-2xl font-bold text-[#191717]">
          {question.label}
        </h2>
        {!hasSelected && (
          <p className="mb-10 text-center text-[18px] leading-[26px] text-[#19171799]">
            {question.subLabel}
          </p>
        )}
         {/* Sub label appears after selection */}
        {hasSelected && (
          <p className="mb-6 max-w-xl text-center text-base text-gray-500">
            {question.id === "weight" ? (
              <>{question.subLabel}</>
            ) : (
              <>
                Based on your height, a healthy range for your body is{" "}
                <span className="font-semibold text-[#E9074B]">
                  {inputValue} {unit}
                </span>
                . You set the target. We&apos;ll build your timeline around your
                target.
              </>
            )}
          </p>
        )}
         {/* TOGGLE */}
        <div className="mb-10 flex w-full max-w-xs rounded-full bg-[#F1F4F9] p-1">
          <button
            onClick={() => handleToggle("LBS")}
            className={`flex-1 rounded-full py-2 font-medium transition-all ${
              unit === "LBS" ? "bg-white shadow-md text-[#E9074B]" : "text-gray-400"
            }`}
          >
            LBS
          </button>
          <button
            onClick={() => handleToggle("KG")}
            className={`flex-1 rounded-full py-2 font-medium transition-all ${
              unit === "KG" ? "bg-white shadow-md text-[#E9074B]" : "text-gray-400"
            }`}
          >
            KG
          </button>
        </div>

        {/* INPUT */}
        <div className="mb-12 flex items-baseline">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="w-36 text-center text-5xl font-bold outline-none"
          />
          <span className="ml-2 text-2xl font-medium">{unit}</span>
        </div>

       </div>

        {/* RULER */}
        <div
          className="relative h-[80px] w-full cursor-grab overflow-hidden bg-black select-none"
          onMouseDown={handleMouseDown}
        >
          {renderMarks()}
        </div>
        
      </div>
      
      <div className="w-full flex justify-center px-4">
        {hasSelected && renderMessage()}
      </div>

      <div className="mt-4 flex items-center justify-center w-full px-4">
        <button
          onClick={handleContinue}
          className="w-full max-w-[400px] bg-[#E9074B] hover:bg-[#d60644] transition-all active:scale-[0.98] cursor-pointer text-white py-4 rounded-2xl font-semibold text-[18px]"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default WeightQuestion
