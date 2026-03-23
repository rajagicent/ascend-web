/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ChevronLeft } from "lucide-react"

export const ProgressHeader = ({ currentIndex, totalSteps, onBack }: any) => {
  const progress = ((currentIndex + 1) / totalSteps) * 100
  const isFirstStep = currentIndex === 0;

  return (
  <div className="mx-auto w-full max-w-4xl px-4 pt-4">
  <div className="flex flex-col md:flex-row md:items-center md:gap-4">
    
    {/* BACK BUTTON */}
    <button
      onClick={onBack}
       disabled={isFirstStep}
       className={`text-xl mb-3 md:mb-0 ${
    isFirstStep
      ? "opacity-30 cursor-not-allowed"
      : "cursor-pointer"
  }`}
    >
      <ChevronLeft />
    </button>

    {/* PROGRESS BAR */}
    <div className="flex-1">
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full bg-[#E9074B] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>

  </div>
</div>
  )
}
