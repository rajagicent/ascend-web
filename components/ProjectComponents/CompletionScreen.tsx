"use client"

import { Button } from "@/components/ui/button"
import { WeightProjectionChart } from "./WeightProjectionChart"
import Image from "next/image"
import TestimonialCard from "./TestimonialCard";


const CalendarIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="4" width="16" height="14" rx="3" stroke="white" strokeWidth="1.5" />
    <path d="M2 8h16" stroke="white" strokeWidth="1.5" />
    <path d="M7 2v3M13 2v3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="7" cy="12" r="1" fill="white" />
    <circle cx="10" cy="12" r="1" fill="white" />
    <circle cx="13" cy="12" r="1" fill="white" />
  </svg>
);
 
const DumbbellIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#8B9FD4"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 4v4M18 4v4M3 8h4l2 4h6l2-4h4M7 12v8M17 12v8" />
  </svg>
);
 
const ClockIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#8B9FD4"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);


const exercises = [
  {
    name: "Squats",
    sets: 3,
    reps: 10,
    rest: "60s rest",
    image:
      "/squats.svg",
  },
  {
    name: "Overhead Press",
    sets: 3,
    reps: 10,
    rest: "60s rest",
    image:
      "/overhead.svg",
  },
  {
    name: "Pull-ups",
    sets: 3,
    reps: 10,
    rest: "60s rest",
    image:
      "/pull.svg",
  },
];
 

const CompleteScreen = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center p-4">
      <div className="flex w-full flex-col justify-between">
        {/* CONTENT */}
        <div>
          {/* TITLE */}
          <h2 className="mb-2 text-center text-3xl font-bold">
            Your Complete plan is ready, Alex.
          </h2>

          <p className="mb-6 text-center font-medium text-base text-[#182737]">
            Based on your metabolic profile and vacation goal, we’ve created a
            trajectory just for you.
          </p>

          {/* CHART CARD */}
          <div className="mb-6 rounded-2xl bg-white p-4 shadow">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs text-gray-500">WEIGHT PROJECTION</p>

              <span className="rounded-full flex gap-1 bg-[#1E1E3A] px-3 py-1 text-[13px] text-white">
                <Image src="/flag.svg" height={18} width={18} alt="flag"/>
                VACATION  ZONE
              </span>
            </div>

            <p className="mb-4  text-2xl font-bold">
              Targeting <span className="font-semibold">170 lbs</span> by August
            </p>

            {/* REAL CHART */}
            <div className="relative">
              <WeightProjectionChart />

              {/* WEEK TAG */}
              <div className="absolute top-10 right-2 rounded bg-[#007AFF] px-2 py-1 text-[10px] text-white">
                WEEK 12
              </div>
            </div>

            {/* WEEK LABELS */}
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>Week 1</span>
              <span>Week 4</span>
              <span>Week 8</span>
              <span className="text-black">Week 12</span>
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

          {/* INFO BOX */}
          <div className="mb-6 rounded-xl border border-blue-300 bg-blue-50 p-4">
            <p className="text-xl font-semibold">
               15 lbs lighter by your{" "}
              <span className="font-semibold text-blue-600">
                Vacation
              </span>
              <br />
              
            </p>
            <span className="text-[#12122275] font-semibold italic text-sm">
              We calculated this based on your current activity levels.
            </span>
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
        </div>

       
      </div>

      {/* <WorkoutPreview/> */}

       <div
      className="flex items-center mt-4 justify-center bg-gray-900 "
     
    >
      <div
        className="relative w-full  rounded-2xl overflow-hidden"
        style={{ background: "#111318", minHeight: 600, padding: "28px 20px 32px" }}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(30,35,50,0.92) 0%, rgba(15,18,28,0.97) 60%)",
          }}
        />
 
        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-2.5">
            <p className="italic text-[13px] text-gray-400 font-medium tracking-wider">
              PREVIEW
            </p>
            <div className="flex items-center gap-1.5 bg-blue-500 text-white text-[13px] font-semibold rounded-full px-4 py-1.5">
              <CalendarIcon />
              Mon , May 12
            </div>
          </div>
 
          {/* Title */}
          <div className="mb-7">
            <p
              className="text-white font-bold m-0 leading-none"
              style={{
              
                fontSize: 50,
                letterSpacing: "0.02em",
              }}
            >
              DAY 1
            </p>
            <p
              className="text-white font-semibold m-0 leading-none"
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
      <TestimonialCard/>
    </div>

     {/* CTA */}
        <Button className="mt-6 w-full max-w-[400px] flex mx-auto justify-center items-center rounded-2xl bg-[#E9074B] py-6 text-lg text-white">
          Start My Plan
        </Button>
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
  name: string;
  sets: number;
  reps: number;
  rest: string;
  image: string;
}) => (
  <div className="flex p-2 items-stretch bg-[rgba(30,35,50,0.85)] border border-blue-900/30 rounded-2xl overflow-hidden min-h-[110px]">
    <Image
    height={100}
    width={100}
      src={image}
      alt={name}
      className="w-[150px] min-w-[140px] h-[130px] object-contain"
    />
    <div className="flex flex-col justify-center gap-2 px-4 py-3 flex-1">
      <p className="text-white font-bold text-[18px] tracking-wide m-0">{name}</p>
      <div className="flex items-center gap-1.5 text-[13px] text-gray-300 font-medium">
        <DumbbellIcon />
        {sets} sets &nbsp;×&nbsp; {reps} reps
      </div>
      <div className="flex items-center gap-1.5 text-[13px] text-gray-300 font-medium">
        <ClockIcon />
        {rest}
      </div>
    </div>
  </div>
);

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
      className={`flex h-[110px] flex-col border-[#E9074B] justify-between rounded-2xl border p-5  `}
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
