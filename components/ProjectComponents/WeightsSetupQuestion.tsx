/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"

const light = [2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20]
const medium = [25, 30, 35, 40, 45, 50]
const heavy = [60, 65, 70, 75, 80, 85, 90, 95, 100]

const plateOptions = [2.5, 5, 10, 25, 35, 45]

export const WeightsSetupQuestion = ({ question, value, update, next }: any) => {
  const options = question.options || []
  const dumbOption = options.find((o: any) => o.value === "WEIGHT_001")
  const kettOption = options.find((o: any) => o.value === "WEIGHT_002")
  const plateOption = options.find((o: any) => o.value === "WEIGHT_003")

  const [dumbbells, setDumbbells] = useState<number[]>(value?.dumbbells || [])
  const [kettlebells, setKettlebells] = useState<number[]>(value?.kettlebells || [])
  const [plates, setPlates] = useState<Record<number, number>>(value?.plates || {})

  // 🔥 toggle dumbbells
  const toggleDumbbell = (w: number) => {
    setDumbbells((prev) =>
      prev.includes(w) ? prev.filter((i) => i !== w) : [...prev, w]
    )
  }

  // 🔥 toggle kettlebells
  const toggleKettlebell = (w: number) => {
    setKettlebells((prev) =>
      prev.includes(w) ? prev.filter((i) => i !== w) : [...prev, w]
    )
  }

  // 🔥 select all dumbbells
  const selectAllDumbbells = (arr: number[]) => {
    setDumbbells((prev) => [...new Set([...prev, ...arr])])
  }

  // 🔥 select all kettlebells
  const selectAllKettlebells = (arr: number[]) => {
    setKettlebells((prev) => [...new Set([...prev, ...arr])])
  }

  // 🔥 plate counter
  const changePlate = (w: number, type: "inc" | "dec") => {
    setPlates((prev) => {
      const current = prev[w] || 0
      const newVal = type === "inc" ? current + 1 : Math.max(0, current - 1)
      return { ...prev, [w]: newVal }
    })
  }

  const handleContinue = () => {
    const data = { dumbbells, kettlebells, plates }
    update(question.id, data)
    next()
  }

  const renderGroup = (title: string, arr: number[], selectedArr: number[], toggleFn: (w: number) => void, selectAllFn: (arr: number[]) => void) => (
    <div className="mb-6">
      <div className="mb-2 flex justify-between">
        <p className="text-sm font-semibold">{title}</p>
        <button onClick={() => selectAllFn(arr)} className="text-xs text-red-500 hover:underline">
          Select All
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {arr.map((w) => {
          const active = selectedArr.includes(w)
          return (
            <div
              key={w}
              onClick={() => toggleFn(w)}
              className={`cursor-pointer rounded-lg px-3 py-2 text-sm transition-all ${active ? "border border-[#E9074B] bg-red-50" : "bg-gray-100 hover:bg-gray-200"} `}
            >
              {w}
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="mx-auto flex min-h-screen flex-col  p-4  ">
      <div className="flex-1">
        <h2 className="mb-2 text-xl md:text-3xl text-center font-semibold">
          {question.label}
        </h2>

        <p className="mb-6 text-sm text-center text-gray-500">
          {question.subLabel}
        </p>

        {/* DUMBBELLS */}
        {dumbOption && (
          <div className="mb-10">
            <p className="font-base border-l-4 border-red-500 pl-2 font-medium text-black">
              Dumbbells
            </p>
            <span className="mb-5 inline-block text-sm leading-0 font-medium text-[#A6A2A2]">
              Choose the pairs of dumbbells you can use
            </span>
            {renderGroup("Light Weights (2.5–20 lb)", light, dumbbells, toggleDumbbell, selectAllDumbbells)}
            {renderGroup("Medium Weights (25–50 lb)", medium, dumbbells, toggleDumbbell, selectAllDumbbells)}
            {renderGroup("Heavy Weights (60–100 lb)", heavy, dumbbells, toggleDumbbell, selectAllDumbbells)}
          </div>
        )}

        {/* KETTLEBELLS */}
        {kettOption && (
          <div className="mb-10">
            <p className="font-base border-l-4 border-red-500 pl-2 font-medium text-black">
              Kettlebells
            </p>
            <span className="mb-5 inline-block text-sm leading-0 font-medium text-[#A6A2A2]">
              Choose the kettlebells you can use
            </span>
            {renderGroup("Light Weights (2.5–20 lb)", light, kettlebells, toggleKettlebell, selectAllKettlebells)}
            {renderGroup("Medium Weights (25–50 lb)", medium, kettlebells, toggleKettlebell, selectAllKettlebells)}
            {renderGroup("Heavy Weights (60–100 lb)", heavy, kettlebells, toggleKettlebell, selectAllKettlebells)}
          </div>
        )}

        {/* PLATES */}
        {plateOption && (
          <div className="mt-6 mb-10">
            <p className="font-base border-l-4 border-red-500 pl-2 font-medium text-black">
              Weight Plates
            </p>
            <span className="mb-5 inline-block text-sm leading-0 font-medium text-[#A6A2A2]">
              Select the plates you have
            </span>

            <table className="w-full rounded-xl border border-gray-200 overflow-hidden text-sm">
              <tbody>
                {plateOptions.map((w) => (
                  <tr key={w} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4 font-medium">{w} lb</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end items-center gap-5">
                        <button
                          onClick={() => changePlate(w, "dec")}
                          className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 active:scale-95 transition-all"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold">{plates[w] || 0}x</span>
                        <button
                          onClick={() => changePlate(w, "inc")}
                          className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 active:scale-95 transition-all"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CONTINUE */}
      <button
        onClick={handleContinue}
        className="mt-6   w-full max-w-100 flex items-center justify-center mx-auto cursor-pointer rounded-2xl bg-[#E9074B] py-3 text-white font-bold transition-transform active:scale-[0.98]"
      >
        Continue
      </button>
    </div>
  )
}

export default WeightsSetupQuestion
