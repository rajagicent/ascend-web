/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Checkbox } from "../ui/checkbox"
import Image from "next/image"

const strength = [
  {
    label: "Dumbbells",
    subLabel: "Strength equipment",
    img: "/Dumbbells.png",
  },
  {
    label: "Bench",
    subLabel: "Flat or adjustable bench",
    img: "/Bench.png",
  },
  {
    label: "Olympic bar and plates",
    subLabel: "Full barbell setup",
    img: "/Bar.png",
  },
  {
    label: "Power cage / Squat rack",
    subLabel: "Strength equipment",
    img: "/power.png",
  },
  {
    label: "Smith machine",
    subLabel: "Strength equipment",
    img: "/smith.png",
  },
  {
    label: "Cable Tower",
    subLabel: "Strength equipment",
    img: "/cable.png",
  },
  {
    label: "Kettlebells",
    subLabel: "Strength equipment",
    img: "/Kettlebells.png",
  },
  {
    label: "Resistance bands",
    subLabel: "Strength equipment",
    img: "/Resistance.png",
  },
]

const cardio = [
  { label: "Treadmill", img: "/Treadmil.png" },
  { label: "Stationary Bike", img: "/StationaryBike.png" },
  { label: "Rowing machine", img: "/Rowing.png" },
  { label: "Elliptical", img: "/Elliptical.png" },
]
export const EquipmentQuestion = ({ question, update, next }: any) => {
  const [selected, setSelected] = useState<string[]>([])
  const [noEquipment, setNoEquipment] = useState(false)

  const toggleItem = (item: string) => {
    if (noEquipment) setNoEquipment(false)

    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  const handleNoEquipment = () => {
    setNoEquipment(!noEquipment)
    setSelected([])
  }

  const handleContinue = () => {
    const finalData = noEquipment ? ["bodyweight_only"] : selected

    update(question.id, finalData)
    console.log("Equipment:", finalData)

    next()
  }

  const renderItem = (item: any) => {
    const active = selected.includes(item.label)
    const Icon = item.icon

    return (
      <div
        key={item.label}
        onClick={() => toggleItem(item.label)}
        className={`flex cursor-pointer items-center justify-between rounded-xl p-3 ${active ? "border border-red-500 bg-red-50" : "bg-gray-100"} `}
      >
        <div className="flex items-center gap-3">
          <Image
            src={item.img}
            alt={item.label}
            width={40}
            height={40}
            className="rounded-md object-contain"
          />

          <div className="flex flex-col">
            <span className="text-sm font-medium">{item.label}</span>

            {item.subLabel && (
              <span className="text-xs text-gray-400">{item.subLabel}</span>
            )}
          </div>
        </div>

        <Checkbox
          checked={active}
          onCheckedChange={() => toggleItem(item.label)}
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
        <div
          onClick={handleNoEquipment}
          className={`mb-6 flex cursor-pointer items-center justify-between rounded-xl p-3 ${noEquipment ? "border border-red-500 bg-red-50" : "bg-gray-100"} `}
        >
          <div className="flex flex-col">
            <span className="text-lg font-bold text-black">
              No equipment — bodyweight only
            </span>
            <span className="text-sm font-medium text-[#19171799]">
              Deselects all other options Bodyweight only
            </span>
          </div>

          <Checkbox
            checked={noEquipment}
            onCheckedChange={handleNoEquipment}
            onClick={(e) => e.stopPropagation()}
            className="data-[state=checked]:border-[#E9074B] data-[state=checked]:bg-[#E9074B] data-[state=checked]:text-white"
          />
        </div>
        {/* STRENGTH */}
        <p className="mb-2 text-sm font-semibold text-blue-600">
          Strength Equipment
        </p>

        <div className="mb-6 grid grid-cols-1 gap-4 space-y-2 md:grid-cols-2">
          {strength.map(renderItem)}
        </div>

        {/* CARDIO */}
        <p className="mb-2 text-sm font-semibold text-blue-600">
          Cardio Equipment
        </p>

        <div className="mb-6 grid grid-cols-1 gap-4 space-y-2 md:grid-cols-2">
          {cardio.map(renderItem)}
        </div>

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
