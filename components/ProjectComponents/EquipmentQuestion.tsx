/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Checkbox } from "../ui/checkbox"
import Image from "next/image"

const imageMap: Record<string, string> = {
  dumbbells: "/Dumbbells.png",
  bench: "/Bench.png",
  olympic_barbell: "/Bar.png",
  squat_rack: "/power.png",
  smith_machine: "/smith.png",
  cable_machine: "/cable.png",
  kettlebells: "/Kettlebells.png",
  resistance_bands: "/Resistance.png",
  treadmill: "/Treadmil.png",
  stationary_bike: "/StationaryBike.png",
  rowing_machine: "/Rowing.png",
  elliptical: "/Elliptical.png",
  bodyweight: "/bodyweight.png", // Fallback if exists
}

export const EquipmentQuestion = ({ question, value, update, next }: any) => {
  const options = question.options || []
  
  // Bodyweight is EQUIP_013
  const bodyweightOption = options.find((o: any) => o.value === "EQUIP_013")
  const strengthOptions = options.filter((o: any) => o.description?.toLowerCase().includes("strength"))
  const cardioOptions = options.filter((o: any) => o.description?.toLowerCase().includes("cardio"))

  const [selected, setSelected] = useState<string[]>(
    value ? (value.includes("EQUIP_013") ? [] : (Array.isArray(value) ? value : [value])) : []
  )
  const [noEquipment, setNoEquipment] = useState(
    value ? value.includes("EQUIP_013") : false
  )

  const toggleItem = (val: string) => {
    if (noEquipment) setNoEquipment(false)

    setSelected((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    )
  }

  const handleNoEquipment = () => {
    setNoEquipment(!noEquipment)
    setSelected([])
  }

  const handleContinue = () => {
    const finalData = noEquipment ? ["EQUIP_013"] : selected
    update(question.id, finalData)
    next()
  }

  const renderItem = (opt: any) => {
    const active = selected.includes(opt.value)
    const imgPath = imageMap[opt.image] || "/Dumbbells.png"

    return (
      <div
        key={opt.value}
        onClick={() => toggleItem(opt.value)}
        className={`flex cursor-pointer items-center justify-between rounded-xl p-3 ${active ? "border border-red-500 bg-red-50" : "bg-gray-100"} `}
      >
        <div className="flex items-center gap-3">
          <Image
            src={imgPath}
            alt={opt.label}
            width={40}
            height={40}
            className="rounded-md object-contain"
          />

          <div className="flex flex-col">
            <span className="text-sm font-medium">{opt.label}</span>

            {opt.description && (
              <span className="text-xs text-gray-400">{opt.description}</span>
            )}
          </div>
        </div>

        <Checkbox
          checked={active}
          onCheckedChange={() => toggleItem(opt.value)}
          onClick={(e) => e.stopPropagation()}
          className="data-[state=checked]:border-[#E9074B] data-[state=checked]:bg-[#E9074B]"
        />
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen flex-col p-4">
      <div className="flex-1">
        <h2 className="mb-2 text-[#191717] text-center text-2xl font-semibold">{question.label}</h2>

        <p className="mb-6 text-sm text-center text-gray-500">{question.subLabel}</p>

        {/* NO EQUIPMENT */}
        {bodyweightOption && (
          <div
            onClick={handleNoEquipment}
            className={`mb-6 flex cursor-pointer items-center justify-between rounded-xl p-3 ${noEquipment ? "border border-red-500 bg-red-50" : "bg-gray-100"} `}
          >
            <div className="flex flex-col">
              <span className="text-lg font-bold text-black">
                {bodyweightOption.label}
              </span>
              <span className="text-sm font-medium text-[#19171799]">
                {bodyweightOption.description}
              </span>
            </div>

            <Checkbox
              checked={noEquipment}
              onCheckedChange={handleNoEquipment}
              onClick={(e) => e.stopPropagation()}
              className="data-[state=checked]:border-[#E9074B] data-[state=checked]:bg-[#E9074B] data-[state=checked]:text-white"
            />
          </div>
        )}
        
        {/* STRENGTH */}
        {strengthOptions.length > 0 && (
          <>
            <p className="mb-2 text-sm font-semibold text-blue-600">
              Strength Equipment
            </p>
            <div className="mb-6 grid grid-cols-1 gap-4 space-y-2 md:grid-cols-2">
              {strengthOptions.map(renderItem)}
            </div>
          </>
        )}

        {/* CARDIO */}
        {cardioOptions.length > 0 && (
          <>
            <p className="mb-2 text-sm font-semibold text-blue-600">
              Cardio Equipment
            </p>
            <div className="mb-6 grid grid-cols-1 gap-4 space-y-2 md:grid-cols-2">
              {cardioOptions.map(renderItem)}
            </div>
          </>
        )}

        {/* INFO BOX */}
        <div className="rounded-xl border border-blue-400 bg-blue-50 p-3 text-sm text-gray-700">
          Got it. You can add or remove equipment anytime in your profile
          settings.
        </div>
      </div>

      {/* CONTINUE BUTTON */}
      <button
        onClick={handleContinue}
        className="mt-4 w-full max-w-100 flex mx-auto  justify-center items-center rounded-2xl cursor-pointer bg-[#E9074B] py-3 text-white"
      >
        Continue
      </button>
    </div>
  )
}
