/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { Info } from "lucide-react"

const areas = [
  { label: "Lower back", img: "/back.png" },
  { label: "Knee", img: "/knee.png" },
  { label: "Shoulder", img: "/shoulder.png" },
  { label: "Neck", img: "/neck.png" },
  { label: "Wrist or elbow", img: "/wrist.png" },
  { label: "Hip", img: "/hip.png" },
  { label: "Ankle or foot", img: "/ankel.png" },
]

export const InjuryQuestion = ({ question, update, next }: any) => {
  const [selected, setSelected] = useState<string[]>([])
  const [noIssues, setNoIssues] = useState(false)

  const toggleArea = (item: string) => {
    if (noIssues) setNoIssues(false)

    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  const handleNoIssues = () => {
    setNoIssues(!noIssues)
    setSelected([])
  }

  const handleContinue = () => {
    const finalData = noIssues ? ["no_issues"] : selected

    console.log("Injury Data:", finalData)

    update(question.id, finalData)
    next()
  }

  return (
    <div className="flex min-h-screen flex-col p-4">
      <div className="flex-1 ">
        {/* TITLE */}
        <h2 className=" text-lg text-center font-semibold">{question.label}</h2>

        <p className="mb-6 text-sm text-center text-gray-500">
          This helps us build a program that&apos;s safe for your body. Select
          all that apply.
        </p>

        {/* NO ISSUES */}
        <div
          onClick={handleNoIssues}
          className={`mb-6 flex cursor-pointer items-center justify-between rounded-xl p-4 ${noIssues ? "border border-red-500 bg-red-50" : "bg-gray-100"} `}
        >
          <span>No issues — I&apos;m good to go</span>


          <Checkbox
            checked={noIssues}
           onCheckedChange={handleNoIssues}
            onClick={(e) => e.stopPropagation()}
            className="data-[state=checked]:border-[#E9074B] data-[state=checked]:bg-[#E9074B] data-[state=checked]:text-white"
          />
        </div>

        {/* AREAS */}
        <p className="mb-3 border-l-4 border-red-500 pl-2 text-sm font-semibold text-blue-600">
  Areas
</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {areas.map((item) => {
            const active = selected.includes(item.label)

            return (
              <div
                key={item.label}
                onClick={() => toggleArea(item.label)}
                className={`flex cursor-pointer items-center justify-between rounded-xl p-3 ${active ? "border border-red-500 bg-red-50" : "bg-gray-100"} `}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="h-10 w-10 rounded-md object-cover"
                  />

                  <span className="text-sm">{item.label}</span>
                </div>

                <Checkbox
                  checked={active}
                  onCheckedChange={() => toggleArea(item.label)}
                  onClick={(e) => e.stopPropagation()}
                  className="data-[state=checked]:border-[#E9074B] data-[state=checked]:bg-[#E9074B] data-[state=checked]:text-white"
                />
              </div>
            )
          })}
        </div>

        {/* DISCLAIMER */}
        <div className="mt-6 rounded-xl border border-blue-400 bg-blue-50 p-3 text-sm text-black">
          <strong className="flex items-center gap-3 text-[#007AFF]"><Info size={18}/> SAFETY DISCLAIMER</strong>
          <br />
          Ascertial adapts your program based on what you share. If you&apos;re
          currently in pain or recovering from surgery, consult your doctor
          before starting.
        </div>
      </div>

      {/* CONTINUE */}
      <button
        onClick={handleContinue}
        className="mt-4 w-full mx-auto cursor-pointer max-w-100 flex items-center justify-center rounded-2xl bg-[#E9074B] py-3 text-white"
      >
        Continue
      </button>
    </div>
  )
}
