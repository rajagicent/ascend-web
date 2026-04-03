/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { Info } from "lucide-react"

const imageMap: Record<string, string> = {
  "Lower Back": "/back.png",
  "Knee": "/knee.png",
  "Shoulder": "/shoulder.png",
  "Neck": "/neck.png",
  "Wrist or elbow": "/wrist.png",
  "Hip": "/hip.png",
  "Ankle or foot": "/ankel.png",
}

export const InjuryQuestion = ({ question, value, update, next }: any) => {
  const options = question.options || []
  
  // No issues is INJ_000
  const noIssuesOption = options.find((o: any) => o.value === "INJ_000")
  const injuryOptions = options.filter((o: any) => o.value !== "INJ_000")

  const [selected, setSelected] = useState<string[]>(
    value ? (value.includes("INJ_000") ? [] : (Array.isArray(value) ? value : [value])) : []
  )
  const [noIssues, setNoIssues] = useState(
    value ? value.includes("INJ_000") : false
  )

  const toggleArea = (val: string) => {
    if (noIssues) setNoIssues(false)

    setSelected((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    )
  }

  const handleNoIssues = () => {
    setNoIssues(!noIssues)
    setSelected([])
  }

  const handleContinue = () => {
    const finalData = noIssues ? ["INJ_000"] : selected
    update(question.field_id || question.id, finalData)
    next()
  }

  return (
    <div className="flex min-h-screen flex-col p-4">
      <div className="flex-1 ">
        {/* TITLE */}
        <h2 className=" text-lg text-center font-semibold">{question.label}</h2>

        <p className="mb-6 text-sm text-center text-gray-500">
          {question.subLabel || "This helps us build a program that's safe for your body. Select all that apply."}
        </p>

        {/* NO ISSUES */}
        {noIssuesOption && (
          <div
            onClick={handleNoIssues}
            className={`mb-6 flex cursor-pointer items-center justify-between rounded-xl p-4 ${noIssues ? "border border-red-500 bg-red-50" : "bg-gray-100"} `}
          >
            <span>{noIssuesOption.label}</span>

            <Checkbox
              checked={noIssues}
              onCheckedChange={handleNoIssues}
              onClick={(e) => e.stopPropagation()}
              className="data-[state=checked]:border-[#E9074B] data-[state=checked]:bg-[#E9074B] data-[state=checked]:text-white"
            />
          </div>
        )}

        {/* AREAS */}
        <p className="mb-3 border-l-4 border-red-500 pl-2 text-sm font-semibold text-blue-600">
          Areas
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {injuryOptions.map((opt: any) => {
            const active = selected.includes(opt.value)
            const imgPath = imageMap[opt.label] || "/back.png"

            return (
              <div
                key={opt.value}
                onClick={() => toggleArea(opt.value)}
                className={`flex cursor-pointer items-center justify-between rounded-xl p-3 ${active ? "border border-red-500 bg-red-50" : "bg-gray-100"} `}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={imgPath}
                    alt={opt.label}
                    className="h-10 w-10 rounded-md object-cover"
                  />

                  <span className="text-sm">{opt.label}</span>
                </div>

                <Checkbox
                  checked={active}
                  onCheckedChange={() => toggleArea(opt.value)}
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
