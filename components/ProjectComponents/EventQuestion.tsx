/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { HeartHandshake, Palmtree, Sun, Cake, Users, Smile } from "lucide-react"

const iconMap: any = {
  wedding: HeartHandshake,
  vacation: Palmtree,
  summer: Sun,
  birthday: Cake,
  reunion: Users,
  other: Smile,
}

export const EventQuestion = ({ question, update, next }: any) => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  const handleContinue = () => {
    update(question.id, {
      event: selectedEvent,
      date: selectedDate,
    })

    console.log("Event Data:", {
      event: selectedEvent,
      date: selectedDate,
    })

    next()
  }

  const handleSkip = () => {
    update(question.id, null)
    next()
  }

  return (
    <div className="mx-auto p-6">
      <h2 className="text-[#191717] text-2xl text-center font-semibold">{question.label}</h2>
      <p className="mb-10 text-center text-[18px] leading-[26px] text-[#19171799]">
        {question.subLabel}
      </p>

      {/* OPTIONS GRID */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        {question.options.map((opt: any) => {
          const active = selectedEvent === opt.value
          const Icon = iconMap[opt.value]

          return (
            <div
              key={opt.value}
              onClick={() => setSelectedEvent(opt.value)}
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl p-4 ${
                active ? "border-2 border-red-500 bg-red-50" : "bg-gray-100"
              } `}
            >
              {Icon && <Icon className="h-6 w-6 text-gray-600" />}
              <span className="text-sm font-medium">{opt.label}</span>
            </div>
          )
        })}
      </div>

      {/* NO EVENT BUTTON */}
      <div
        onClick={() => setSelectedEvent("no_event")}
        className={`mb-6 cursor-pointer rounded-xl py-3 text-center ${
          selectedEvent === "no_event"
            ? "border-2 border-red-500 bg-red-50"
            : "bg-gray-100"
        } `}
      >
        No Specific Event
      </div>

      <div className="mb-6 flex items-start justify-center gap-3 rounded-xl border border-blue-400 bg-blue-50 p-4">
        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
          ✓
        </div>

        <p className="text-sm text-gray-700">
          We’ll make sure you&apos;re ready by then. Pick your date below
        </p>
      </div>

      {/* CALENDAR */}
      {selectedEvent && selectedEvent !== "no_event" && (
        <>
          <div className="mx-auto max-w-xs mb-6 w-full rounded-xl bg-white p-4 shadow">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()} // 🔥 no past dates
             modifiersClassNames={{
  selected:
    "bg-[#E9074B] text-white rounded-full flex items-center justify-center",
}}
              className="w-full"
            />
          </div>

          {/* ✅ TIMELINE BOX */}
          {selectedDate && (
            <div className="mb-6 rounded-xl bg-purple-100 p-4 text-sm text-gray-700">
              “That’s a strong timeline. We can make a serious dent in your goal
              before your event.”
            </div>
          )}
        </>
      )}
      {/* CONTINUE */}
     <div className="w-full flex md:flex-row flex-col gap-4 justify-between">
       <button
        onClick={handleContinue}
        
        className=" w-full max-w-100 rounded-2xl cursor-pointer bg-[#E9074B] py-3 text-white"
      >
        Continue
      </button>

      {/* SKIP */}
      <button onClick={handleSkip} className="w-full cursor-pointer max-w-100 border py-3 rounded-2xl text-gray-500">
        Skip
      </button>
     </div>
    </div>
  )
}
