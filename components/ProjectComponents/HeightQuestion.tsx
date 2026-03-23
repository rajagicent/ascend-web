/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

export const HeightQuestion = ({
  question,
  update,
  next,
}: any) => {
  const [unit, setUnit] = useState<"Feet" | "Centimeter">("Feet");

  const [feetValue, setFeetValue] = useState("");
  const [inchesValue, setInchesValue] = useState("");
  const [cmValue, setCmValue] = useState("");

  // 🔥 Convert everything to CM (single source for backend)
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

  const handleToggle = (newUnit: "Feet" | "Centimeter") => {
    if (newUnit === unit) return;

    if (newUnit === "Centimeter") {
      const cm = getFinalHeightInCm();
      setCmValue(cm ? cm.toString() : "");
    } else {
      const cm = parseInt(cmValue) || 0;

      if (cm > 0) {
        const totalFeet = cm / 30.48;
        const ft = Math.floor(totalFeet);
        const inc = Math.round((totalFeet - ft) * 12);

        setFeetValue(ft.toString());
        setInchesValue(inc.toString());
      }
    }

    setUnit(newUnit);
  };

  const handleContinue = () => {
    const finalCm = getFinalHeightInCm();

    if (!finalCm) {
      alert("Please enter height");
      return;
    }

    console.log("Final Height (cm):", finalCm);

    // 🔥 Save in global state
    update(question.id, finalCm);

    // 🔥 Move to next step
    next();
  };
const handleFeetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value;

  // allow only numbers
  if (!/^\d*$/.test(val)) return;

  setFeetValue(val);
};

const handleInchesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value;

  if (!/^\d*$/.test(val)) return;

  setInchesValue(val);
};
  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)] md:min-h-[calc(100vh-200px)] items-center w-full max-w-sm mx-auto p-4">
      <div className="flex-1">
        
      {/* Title */}
      <h2 className="text-[#191717] text-2xl font-semibold text-center">
        {question.label}
      </h2>
      <p className="mb-10 text-center text-[18px] leading-[26px] text-[#19171799]">
          {question.subLabel}
        </p>

      {/* Toggle */}
      <div className="flex bg-[#F1F4F9] rounded-full p-1 w-full mb-10">
        <button
          onClick={() => handleToggle("Feet")}
          className={`flex-1 py-2 px-6 rounded-full font-semibold ${
            unit === "Feet" ? "bg-white shadow-md" : "text-gray-400"
          }`}
        >
        Feet + Inches
        </button>

        <button
          onClick={() => handleToggle("Centimeter")}
          className={`flex-1 py-2 px-6 rounded-full font-semibold ${
            unit === "Centimeter"
              ? "bg-white shadow-md"
              : "text-gray-400"
          }`}
        >
          Centimeter
        </button>
      </div>

      <div className="mx-auto flex justify-center w-full">
        {/* Inputs */}
      {unit === "Feet" ? (
        <div className="flex gap-4 mb-10">
          <input
            type="text"
            value={feetValue}
          onChange={handleFeetChange}
            className="w-20 h-20 text-2xl text-center border rounded-xl"
            placeholder="Ft"
            maxLength={2}
          />
          <input
            type="text"
            value={inchesValue}
              onChange={handleInchesChange}
            className="w-20 h-20 text-2xl text-center border rounded-xl"
            placeholder="In"
            maxLength={1}
          />
        </div>
      ) : (
        <input
          type="text"
          value={cmValue}
          onChange={(e) => setCmValue(e.target.value)}
          className="w-20 h-20 text-2xl text-center border rounded-xl mb-10"
          placeholder="Cm"
        />
      )}
      </div>

      </div>
      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="w-full bg-[#E9074B] cursor-pointer text-white py-3 rounded-2xl font-semibold"
      >
        Continue
      </button>
    </div>
  );
};