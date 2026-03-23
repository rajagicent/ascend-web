/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"

const light = [2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20]
const medium = [25, 30, 35, 40, 45, 50]
const heavy = [60, 65, 70, 75, 80, 85, 90, 95, 100]

const plateOptions = [2.5, 5, 10, 25, 35, 45]

export const WeightsSetupQuestion = ({ question, update, next }: any) => {
  const [selected, setSelected] = useState<number[]>([])
  const [plates, setPlates] = useState<Record<number, number>>({})

  // 🔥 toggle weights
  const toggleWeight = (w: number) => {
    setSelected((prev) =>
      prev.includes(w) ? prev.filter((i) => i !== w) : [...prev, w]
    )
  }

  // 🔥 select all
  const selectAll = (arr: number[]) => {
    setSelected((prev) => [...new Set([...prev, ...arr])])
  }

  // 🔥 plate counter
  const changePlate = (w: number, type: "inc" | "dec") => {
    setPlates((prev) => {
      const current = prev[w] || 0
      const newVal = type === "inc" ? current + 1 : Math.max(0, current - 1)

      return {
        ...prev,
        [w]: newVal,
      }
    })
  }

  const handleContinue = () => {
    const data = {
      dumbbells: selected,
      plates,
    }

    console.log("Weights Data:", data)

    update(question.id, data)
    next()
  }

  const renderGroup = (title: string, arr: number[]) => (
    <div className="mb-6">
      <div className="mb-2 flex justify-between">
        <p className="text-sm font-semibold">{title}</p>
        <button onClick={() => selectAll(arr)} className="text-xs text-red-500">
          Select All
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {arr.map((w) => {
          const active = selected.includes(w)

          return (
            <div
              key={w}
              onClick={() => toggleWeight(w)}
              className={`cursor-pointer rounded-lg px-3 py-2 text-sm ${active ? "border border-blue-400 bg-blue-100" : "bg-gray-100"} `}
            >
              {w}
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="mx-auto flex min-h-screen flex-col p-4">
      <div className="flex-1">
        <h2 className="mb-2 text-xl md:text-3xl text-center font-semibold">
          Tell us what weights you have.
        </h2>

        <p className="mb-6 text-sm text-center text-gray-500">
          This lets us prescribe exact loads in your workouts.
        </p>

        {/* DUMBBELLS */}
        <div>
          <p className="font-base border-l-4 border-red-500 pl-2   font-medium text-black">
            DumbbellS
          </p>
          {/* <p className="mb-3 border-l-4 border-red-500 pl-2 text-sm font-semibold text-blue-600">
  Areas
</p> */}
          <span className="mb-5 inline-block text-sm leading-0 font-medium text-[#A6A2A2]">
            Choose the pairs of dumbbells you can use
          </span>
          {renderGroup("Light Weights (2.5–20 lb)", light)}
          {renderGroup("Medium Weights (25–50 lb)", medium)}
          {renderGroup("Heavy Weights (60–100 lb)", heavy)}
        </div>

        <div>
          <p className="font-base border-l-4 border-red-500 pl-2  font-medium text-black">
            Kettlebells
          </p>
          <span className="mb-5 inline-block text-sm leading-0 font-medium text-[#A6A2A2]">
            Choose the Weight you can use
          </span>
          {renderGroup("Light Weights (2.5–20 lb)", heavy)}
          {renderGroup("Medium Weights (25–50 lb)", medium)}
          {renderGroup("Heavy Weights (60–100 lb)", heavy)}
        </div>

        {/* PLATES */}
        <div className="mt-6">
          <p className="font-base border-l-4 border-red-500 pl-2  font-medium text-black">
            Weight Plates
          </p>
          <span className="mb-5 inline-block text-sm leading-0 font-medium text-[#A6A2A2]">
            Select the plates you have
          </span>

          <table className="w-full rounded-xl border border-gray-200">
            {/* <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-sm font-medium text-gray-600">
                  Weight
                </th>
                <th className="p-3 text-center text-sm font-medium text-gray-600">
                  Count
                </th>
                <th className="p-3 text-right text-sm font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead> */}

            <tbody>
              {plateOptions.map((w, index) => (
                <tr key={w} className=" border">
                  {/* Weight */}
                  <td className="p-3">{w} lb</td>

               
                 

                  {/* Actions */}
                  <td className="p-3 text-right">
                    <div className="flex justify-end items-center gap-5">
                      <button
                        onClick={() => changePlate(w, "dec")}
                        className="h-8 w-8 rounded bg-black text-white"
                      >
                        -
                      </button>

                      {plates[w] || 0}x

                      <button
                        onClick={() => changePlate(w, "inc")}
                        className="h-8 w-8 rounded bg-black text-white"
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
      </div>

      {/* CONTINUE */}
      <button
        onClick={handleContinue}
        className="mt-4 w-full max-w-100 flex items-center justify-center mx-auto cursor-pointer rounded-2xl bg-[#E9074B] py-3 text-white"
      >
        Continue
      </button>
    </div>
  )
}
