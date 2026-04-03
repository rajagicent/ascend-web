/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { HeartHandshake, Palmtree, Sun, Cake, Users, Smile } from "lucide-react"

const iconMap: any = {
  EVENT_001: HeartHandshake, // Wedding
  EVENT_002: Palmtree,       // Vacation
  EVENT_003: Sun,            // Summer
  EVENT_004: Cake,           // Birthday
  EVENT_005: Users,          // Reunion
  EVENT_006: Smile,          // Other
}

export const EventQuestion = ({ question, value, update, next }: any) => {
  const options = question.options || []
  const noEventOption = options.find((o: any) => o.value === "EVENT_000")
  const eventOptions = options.filter((o: any) => o.value !== "EVENT_000")

  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  // 🔥 Hydrate from value prop
  useEffect(() => {
    if (value && typeof value === "object") {
      if (value.event) setSelectedEvent(value.event);
      if (value.date) {
        const d = new Date(value.date);
        if (!isNaN(d.getTime())) setSelectedDate(d);
      }
    } else if (typeof value === "string") {
      // In case it was stored as just the ID previously
      setSelectedEvent(value);
    }
  }, [value]);

  const handleContinue = () => {
    update(question.field_id || question.id, {
      event: selectedEvent,
      date: selectedDate,
    })
    next()
  }

  const handleSkip = () => {
    update(question.field_id || question.id, { event: "EVENT_000", date: null })
    next()
  }

  return (
    <div className="mx-auto p-6 max-h-[85vh] overflow-y-auto"   style={{
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }}>
      <h2 className="text-[#191717] text-2xl text-center font-semibold">{question.label}</h2>
      <p className="mb-8 text-center text-[18px] leading-[26px] text-[#19171799]">
        {question.subLabel}
      </p>

      {/* OPTIONS GRID */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        {eventOptions.map((opt: any) => {
          const active = selectedEvent === opt.value
          const Icon = iconMap[opt.value]

          return (
            <div
              key={opt.value}
              onClick={() => setSelectedEvent(opt.value)}
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl p-4 transition-all ${
                active ? "border-2 border-[#E9074B] bg-red-50" : "bg-gray-100"
              } `}
            >
              {Icon && <Icon className={`h-6 w-6 ${active ? "text-[#E9074B]" : "text-gray-600"}`} />}
              <span className={`text-sm font-medium ${active ? "text-[#E9074B]" : "text-gray-700"}`}>{opt.label}</span>
            </div>
          )
        })}
      </div>

      {/* NO EVENT OPTION */}
      {noEventOption && (
        <div
          onClick={() => {
            setSelectedEvent(noEventOption.value);
            setSelectedDate(undefined);
          }}
          className={`mb-6 cursor-pointer rounded-xl py-4 text-center font-medium transition-all ${
            selectedEvent === noEventOption.value
              ? "border-2 border-[#E9074B] bg-red-50 text-[#E9074B]"
              : "bg-gray-100 text-gray-700"
          } `}
        >
          {noEventOption.label}
        </div>
      )}

      {selectedEvent && selectedEvent !== "EVENT_000" && (
        <>
          <div className="mb-6 flex items-start justify-center gap-3 rounded-xl border border-blue-400 bg-blue-50 p-4 animate-in fade-in slide-in-from-top-2">
            <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
              ✓
            </div>
            <p className="text-sm text-gray-700">
              We’ll make sure you&apos;re ready by then. Pick your date below
            </p>
          </div>

          {/* CALENDAR */}
          <div className="mx-auto max-w-xs mb-6 w-full rounded-xl bg-white p-4 shadow">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()} 
              modifiersClassNames={{
                selected: "bg-[#E9074B] text-white rounded-full flex items-center justify-center",
              }}
              className="w-full"
            />
          </div>

          {/* TIMELINE BOX */}
          {selectedDate && (
            <div className="mb-6 rounded-xl bg-purple-100 p-4 text-sm text-gray-700 animate-in fade-in scale-in-95">
              “That’s a strong timeline. We can make a serious dent in your goal before your event.”
            </div>
          )}
        </>
      )}

      {/* CONTINUE */}
      <div className="w-full flex md:flex-row flex-col gap-4 justify-between mt-4">
        <button
          onClick={handleContinue}
          disabled={!selectedEvent || (selectedEvent !== "EVENT_000" && !selectedDate)}
          className="w-full max-w-100 rounded-2xl cursor-pointer bg-[#E9074B] py-3 text-white font-semibold disabled:opacity-50 transition-opacity"
        >
          Continue
        </button>

        <button 
          onClick={handleSkip} 
          className="w-full cursor-pointer max-w-100 border border-gray-200 py-3 rounded-2xl text-gray-500 hover:bg-gray-50 transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}

export default EventQuestion
