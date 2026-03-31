/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from "react"

export const HeightQuestion = ({ question, update, next }: any) => {
  const [unit, setUnit] = useState<"Feet" | "Centimeter">("Feet")

  const [feetValue, setFeetValue] = useState("")
  const [inchesValue, setInchesValue] = useState("")
  const [cmValue, setCmValue] = useState("")

  // 🔥 Convert everything to CM (single source for backend)
  const getFinalHeightInCm = () => {
    if (unit === "Centimeter") {
      return parseInt(cmValue) || 0
    } else {
      const ft = parseInt(feetValue) || 0
      const inc = parseInt(inchesValue) || 0
      const totalFeet = ft + inc / 12
      return Math.round(totalFeet * 30.48)
    }
  }

  const handleToggle = (newUnit: "Feet" | "Centimeter") => {
    if (newUnit === unit) return

    if (newUnit === "Centimeter") {
      const cm = getFinalHeightInCm()
      setCmValue(cm ? cm.toString() : "")
    } else {
      const cm = parseInt(cmValue) || 0

      if (cm > 0) {
        const totalFeet = cm / 30.48
        const ft = Math.floor(totalFeet)
        const inc = Math.round((totalFeet - ft) * 12)

        setFeetValue(ft.toString())
        setInchesValue(inc.toString())
      }
    }

    setUnit(newUnit)
  }

  const handleContinue = () => {
    const finalCm = getFinalHeightInCm()

    if (!finalCm) {
      alert("Please enter height")
      return
    }

    console.log("Final Height (cm):", finalCm)

    // 🔥 Save in global state
    update(question.id, finalCm)

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
  return (
    <div className="mx-auto flex min-h-[calc(100vh-60px)] w-full max-w-sm flex-col items-center p-4 md:min-h-[calc(100vh-200px)]">
      <div className="flex-1">
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
              unit === "Centimeter" ? "bg-white text-[#E9074B]!  shadow-md" : "text-gray-400"
            }`}
          >
          CM
          </button>
        </div>

        <div className="mx-auto flex w-full justify-center">
          {/* Inputs */}
          {unit === "Feet" ? (
            <div className="mb-10 flex gap-4">
              <input
                type="text"
                value={feetValue}
                onChange={handleFeetChange}
                className="h-20 w-20 rounded-xl border text-center text-2xl"
                placeholder="Ft"
                maxLength={2}
              />
              <input
                type="text"
                value={inchesValue}
                onChange={handleInchesChange}
                className="h-20 w-20 rounded-xl border text-center text-2xl"
                placeholder="In"
                maxLength={1}
              />
            </div>
          ) : (
            <input
              type="text"
              value={cmValue}
              onChange={(e) => setCmValue(e.target.value)}
              className="mb-10 h-20 w-20 rounded-xl border text-center text-2xl"
              placeholder="Cm"
            />
          )}
        </div>
      </div>
      {/* Continue Button */}

      {((feetValue && inchesValue) || cmValue) && (
        <p className="my-2 text-sm font-medium text-[#E9074B]">
          Please double-check your height
        </p>
      )}
      <button
        onClick={handleContinue}
        className="w-full cursor-pointer rounded-2xl bg-[#E9074B] py-3 font-semibold text-white"
      >
        Continue
      </button>
    </div>
  )
}
