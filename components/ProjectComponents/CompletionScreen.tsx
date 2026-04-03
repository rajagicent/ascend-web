"use client"

import { Button } from "@/components/ui/button"

import Image from "next/image"
import TestimonialCard from "./TestimonialCard"
import { useOnboarding } from "@/hooks/useOnboarding"
import { submitFinalSurvey } from "@/action/redisApi"
import { useState } from "react"
import { CalendarDays, Dumbbell, Loader2, Timer } from "lucide-react"
import WeightGraph from "./WeightGraph"
import MilestoneTimeline from "./Milestonetimeline"
import Link from "next/link"

const exercises = [
  {
    name: "Squats",
    sets: 3,
    reps: 10,
    rest: "60s rest",
    image: "/dumbellbg.svg",
  },
  {
    name: "Overhead Press",
    sets: 3,
    reps: 10,
    rest: "60s rest",
    image: "/dumbellbg.svg",
  },
  {
    name: "Pull-ups",
    sets: 3,
    reps: 10,
    rest: "60s rest",
    image: "/dumbellbg.svg",
  },
]

type MilestoneCardProps = {
  title: string
  weeks: number
  description: string
}

const milestoneData: MilestoneCardProps[] = [
  {
    title: "First Milestone",
    weeks: 2,
    description: "Consistency established",
  },
  {
    title: "Next Checkpoint",
    weeks: 4,
    description: "improved energy",
  },
]

const graphData = [
  { name: "W1", value: 80 },
  { name: "W2", value: 70 },
  { name: "W3", value: 50 },
  { name: "W4", value: 25 },
  { name: "W5", value: 10 },
]

const CompleteScreen = () => {
  const { state, questionsMap } = useOnboarding()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const name = state.answers["name"] || "Alex"
  const goal = state.answers["goal"]
  const isHealthyGoal = goal === "GOAL_004"
  const Gate = goal === "GOAL_001" ? "fat_loss" : goal === "GOAL_002" ? "muscle_gain" : "general_fitness"


  return (
    <div className="flex min-h-screen flex-col justify-center p-4">
      <div className="flex w-full flex-col justify-between">
        {/* CONTENT */}
        <>
          {/* TITLE */}
          <h2 className="mb-2 text-center text-3xl font-bold">
            Your Complete plan is ready, {name}.
          </h2>

          <p className="mb-6 text-center text-base font-medium text-[#182737]">
            Based on your metabolic profile and {goal === "GOAL_001" ? "fat loss" : goal === "GOAL_002" ? "muscle gain" : "health"} goal, we’ve created a
            trajectory just for you.
          </p>

          {isHealthyGoal ? (
            <div className="mb-8">
               <MilestoneTimeline />
            </div>
          ) : (
            <>
              {Gate === "fat_loss" ? (
                <>
                  {/* CHART CARD */}
                  <div className="mb-6">
                    {/* REAL CHART */}
                    <div className="relative">
                      <WeightGraph
                        data={graphData}
                        target="165 lb"
                        variant="projection"
                      />
                    </div>
                  </div>

                  {/* STATS */}
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    <StatCard
                      title="To Target"
                      value="15"
                      unit="lbs / week"
                      highlight
                      largeValue
                    />
                    <StatCardDate title="Goal Date" date="August 14, 2026" />
                    <StatCard
                      title="Weekly Rate"
                      value="1.2"
                      unit="lbs / week"
                      largeValue
                    />
                    <StatCard
                      title="Total Duration"
                      value="12"
                      unit="weeks"
                      largeValue
                    />
                  </div>
                </>
              ) : (
                <>
                  <MilestoneTimeline />
                  {/* <div className="mb-6 grid grid-cols-2 gap-3"></div> */}
                  <div className="mb-4 flex w-full max-w-xl gap-4">
                    {milestoneData.map((item, index) => (
                      <MilestoneCard
                        key={index}
                        title={item.title}
                        weeks={item.weeks}
                        description={item.description}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* INFO BOX */}
              <div className="mb-6 rounded-xl border border-blue-300 bg-blue-50 p-4">
                {Gate === "fat_loss" ? (
                  <>
                    <p className="text-xl font-semibold">
                      15 lbs lighter by your{" "}
                      <span className="font-semibold text-blue-600">Vacation</span>
                      <br />
                    </p>
                    <span className="text-sm font-semibold text-[#12122275] italic">
                      We calculated this based on your current activity levels.
                    </span>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-semibold">
                      TOTAL DURATION
                      <br />
                      <span className="font-semibold text-blue-600">12 WEEKS</span>
                      <br />
                    </p>
                    <span className="text-sm font-semibold text-[#12122275] italic">
                      Guided lifecycle
                    </span>
                  </>
                )}
              </div>

              {/* PROGRAM SUMMARY */}
              <div>
                <h3 className="mb-3 font-semibold">Program Summary</h3>

                <ul className="grid grid-cols-1 gap-4 space-y-3 text-sm md:grid-cols-2">
                  <SummaryItem
                    label="Frequency"
                    value="4-day personalized"
                    img="/freq.png"
                  />
                  <SummaryItem
                    label="Setting"
                    value="Commercial Gym"
                    img="/setting.png"
                  />
                  <SummaryItem
                    label="Schedule"
                    value="Mon, Wed, Fri, Sat"
                    img="/time.png"
                  />
                  <SummaryItem
                    label="Session Duration"
                    value="45 min/session"
                    img="/duration.png"
                  />
                  <SummaryItem
                    label="Nutrition"
                    value="Mild calorie deficit + high protein"
                    img="/nutrition.png"
                  />
                  <SummaryItem
                    label="Coaching Style"
                    value="Balanced (guidance + flexibility)"
                    img="/coaching.png"
                  />
                </ul>
              </div>
            </>
          )}
        </>
      </div>

      <div className="mt-4 flex items-center justify-center bg-gray-900">
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{
            background: "#000000C9",
            minHeight: 600,
            padding: "28px 20px 32px",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 z-0" />

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-2.5 flex items-start justify-between">
              <p className="text-[13px] font-medium tracking-wider text-gray-400 italic">
                PREVIEW
              </p>
              <div className="flex items-center justify-center gap-1.5 rounded-full bg-blue-500 px-4 py-1.5 text-[13px] font-medium text-white">
                <CalendarDays size={16} />
                Mon , May 12
              </div>
            </div>

            {/* Title */}
            <div className="mb-7">
              <p
                className="m-0 leading-none font-bold text-white"
                style={{
                  fontSize: 50,
                  letterSpacing: "0.02em",
                }}
              >
                DAY 1
              </p>
              <p
                className="m-0 leading-none font-semibold text-white"
                style={{
                  fontSize: 36,
                  letterSpacing: "0.04em",
                }}
              >
                FOUNDATION
              </p>
            </div>

            {/* Exercise List */}
            <div className="flex flex-col gap-6">
              {exercises.map((exercise, index) => (
                <div key={exercise.name}>
                  <ExerciseCard {...exercise} />
                  {/* {index < exercises.length - 1 && <Connector />} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <TestimonialCard />
      </div>

      {/* CTA */}
      <Link href="/subscription">
      <Button
        // onClick={handleStartPlan}
        // disabled={isSubmitting}
        className="mx-auto mt-6 flex w-full max-w-[400px] items-center justify-center rounded-2xl bg-[#E9074B] py-6 text-lg text-white"
      >
        {/* {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />} */}
        Start My Plan
      </Button>
      </Link>
    </div>
  )
}

export default CompleteScreen

const ExerciseCard = ({
  name,
  sets,
  reps,
  rest,
  image,
}: {
  name: string
  sets: number
  reps: number
  rest: string
  image: string
}) => (
  <div className="flex min-h-27.5 overflow-hidden rounded-2xl border border-[#868484] bg-[#00000066] p-2">
    <Image
      height={100}
      width={100}
      src={image}
      alt={name}
      className="h-32.5 w-30 md:w-37.5 min-w-30 rounded-2xl object-cover"
    />
    <div className="flex flex-1 flex-col justify-center gap-2 px-4 py-3">
      <p className="m-0 text-[18px] font-bold tracking-wide text-white">
        {name}
      </p>
      <div className="flex items-center gap-1.5 text-[16px] font-medium text-gray-300">
        <Dumbbell size={20} className="rotate-45" />
        {sets} sets &nbsp;×&nbsp; {reps} reps
      </div>
      <div className="flex items-center gap-1.5 text-[16px] font-medium text-gray-300">
        <Timer size={20} />
        {rest}
      </div>
    </div>
  </div>
)

const StatCard = ({
  title,
  value,
  unit,
  highlight,
  largeValue,
}: {
  title: string
  value: string
  unit?: string
  highlight?: boolean
  largeValue?: boolean
}) => {
  return (
    <div
      className={`flex h-[110px] flex-col justify-between rounded-2xl border border-[#E9074B] p-5`}
    >
      <p className="text-[16px] font-bold tracking-wide text-[#121222] uppercase">
        {title}
      </p>
      <div className="flex items-baseline gap-1">
        <span
          className={`leading-none font-bold ${
            highlight ? "text-[#E9074B]" : "text-[#E9074B]"
          } ${largeValue ? "text-3xl" : "text-xl"}`}
        >
          {value}
        </span>
        {unit && (
          <span className="text-sm font-normal text-[#121222]">{unit}</span>
        )}
      </div>
    </div>
  )
}

const StatCardDate = ({ title, date }: { title: string; date: string }) => {
  return (
    <div className="flex h-[110px] flex-col justify-between rounded-2xl border border-[#E9074B] p-5">
      <p className="text-[16px] font-bold tracking-wide text-gray-800 uppercase">
        {title}
      </p>
      <p className="text-lg font-bold tracking-wide text-[#E9074B] uppercase">
        {date}
      </p>
    </div>
  )
}

const SummaryItem = ({
  label,
  value,
  img,
}: {
  label: string
  value: string
  img: string
}) => {
  return (
    <li className="flex items-start gap-3">
      <div className="">
        <Image src={img} alt="img" height={40} width={40} />
      </div>

      <div>
        <p className="text-xs text-gray-500">{label.toUpperCase()}</p>
        <p className="font-medium">{value}</p>
      </div>
    </li>
  )
}

const MilestoneCard = ({ title, weeks, description }: MilestoneCardProps) => {
  return (
    <div
      className="flex-1 rounded-2xl bg-white p-5"
      style={{ border: "1.5px solid #f43f7e" }}
    >
      {/* Card Title */}
      <p
        className="mb-3 tracking-wide text-gray-900 uppercase"
        style={{ fontSize: 11, fontWeight: 700 }}
      >
        {title}
      </p>

      {/* Weeks number + label */}
      <div className="mb-1 flex items-baseline gap-2">
        <span
          className="leading-none"
          style={{ fontSize: 48, fontWeight: 700, color: "" }}
        >
          {weeks}
        </span>
        <span className="text-base font-medium text-gray-900">Weeks</span>
      </div>

      {/* Description */}
      <p className="mt-1 text-xs text-gray-400">{description}</p>
    </div>
  )
}
