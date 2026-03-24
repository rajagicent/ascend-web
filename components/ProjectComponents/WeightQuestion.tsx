/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"

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
      alert("Please enter weight")
      return
    }

    console.log("Final Weight (kg):", finalKg)

    // ✅ save globally
    update(question.id, finalKg)

    // ✅ go next
    next()
  }

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
       <div className="text-center flex justify-center items-center flex-col ">
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
            {question.id === "current" ? (
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
            className={`flex-1 rounded-full py-2 ${
              unit === "LBS" ? "bg-white shadow-md" : "text-gray-400"
            }`}
          >
            LBS
          </button>
          <button
            onClick={() => handleToggle("KG")}
            className={`flex-1 rounded-full py-2 ${
              unit === "KG" ? "bg-white shadow-md" : "text-gray-400"
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
            className="w-36 text-center text-5xl font-bold"
          />
          <span className="ml-2 text-2xl">{unit}</span>
        </div>

       </div>

       
       

        {/* RULER */}
        <div
          className="relative h-[70px] w-full cursor-grab overflow-hidden bg-black"
          onMouseDown={handleMouseDown}
        >
          {renderMarks()}
        </div>
        
      </div>
      <div>
        {hasSelected && (
          <div className="mt-10 mb-4 flex w-full max-w-[400px] items-center gap-2 rounded-xl border border-blue-400 bg-blue-50 p-4 text-sm text-gray-700">
            <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />

            <p>
              {question.id === "current"
                ? "Your starting point is set. Now let's define where you're going."
                : "Target Set. We'll build your timeline around this"}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center w-full">
        {/* CONTINUE BUTTON */}
        
        <button
          onClick={handleContinue}
        className="w-full  max-w-[400px]  bg-[#E9074B] cursor-pointer text-white py-3 rounded-2xl font-semibold"

          // className="mt-6 max-w-[400px] mx-auto  w-full cursor-pointer rounded-2xl bg-[#E9074B] py-4 font-semibold text-white"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default WeightQuestion
