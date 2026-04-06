import { Button } from "@/components/ui/button"
import { LockKeyhole } from "lucide-react"
import WeightGraph from "./WeightGraph"
import Image from "next/image"
import { useOnboarding } from "@/hooks/useOnboarding"

type Exercise = {
  name: string
  sets: number
  reps: number
}

const exercises: Exercise[] = [
  { name: "Barbell Squats", sets: 3, reps: 12 },
  { name: "Overhead Press", sets: 2, reps: 14 },
  { name: "Pull - ups", sets: 1, reps: 14 },
]

export const CheckpointScreen = ({ next }: any) => {
  const { state, questionsMap } = useOnboarding()

  const name = state.answers["name"] || ""
  const goal = state.answers["goal"]
  const currentWeight = Number(state.answers["weight"]) || 0
  const targetWeight = Number(state.answers["target_weight"]) || 0
  const weightDiff = Math.abs(currentWeight - targetWeight)
  const upComingEvent = state.answers["event"]



  const graphData = [
    { name: "Now", value: currentWeight },
    { name: "W2", value: currentWeight + (targetWeight - currentWeight) * 0.2 },
    { name: "W4", value: currentWeight + (targetWeight - currentWeight) * 0.5 },
    { name: "W6", value: currentWeight + (targetWeight - currentWeight) * 0.8 },
    { name: "Goal", value: targetWeight },
  ]

  // Get labels for badges
  const locationQ = questionsMap["location"]
  const locationLabel = locationQ?.options?.find((o: any) => o.value === state.answers["location"])?.label || "Commercial Gym"

  const fitnessQ = questionsMap["fitness"]
  const fitnessLabel = fitnessQ?.options?.find((o: any) => o.value === state.answers["fitness"])?.label || "Advanced"

  const goalText = goal === "GOAL_002" ? "muscle gain" : "fat loss"

  // Event parsing
  const eventData = state.answers["event"] || {}
  const eventDate = eventData?.date ? new Date(eventData.date) : null
  const eventId = typeof eventData === "object" ? eventData.event : eventData
  const eventLabel = questionsMap["event"]?.options?.find((o: any) => o.value === eventId)?.label || "your goal"

  // Dynamic days calculation
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffInTime = eventDate ? eventDate.getTime() - today.getTime() : 30 * 24 * 60 * 60 * 1000;
  // If event is today or in past, default to a minimum of 30 or similar logic? 
  // For onboarding, we'll use the diff if it exists, otherwise 30.
  const diffInDays = eventDate 
    ? Math.max(1, Math.ceil(diffInTime / (1000 * 3600 * 24)))
    : 30;

  const goalDateStr = eventDate 
    ? eventDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "---------"

  return (
    <div className="flex min-h-screen justify-center p-4">
      {/* MAIN CONTAINER */}
      <div className="flex w-full flex-col justify-between">
        {/* CONTENT */}
        <div>
          {/* TITLE */}
          <h2 className="mb-2 text-2xl font-bold">
            Your Plan just got a lot more accurate{name ? `, ${name}` : ""}.
          </h2>

          <p className="mb-6 text-gray-500">
            We now know your schedule, your equipment, and your physical
            profile.
          </p>

          {/* GRAPH CARD */}
          <div className="">
            <div className="mb-2">
              <WeightGraph
                data={graphData}
                current={currentWeight + " kg"}
                target={targetWeight + " kg"}
                variant="confidence"
              />
            </div>
          </div>

          {/* STATS GRID */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <StatCard 
              title="TO TARGET" 
              value={`${weightDiff} kg`} 
              highlight 
            />
            <StatCardDate title="Goal Date" date={goalDateStr} />
            <StatCard title="WEEKLY RATE" value="0.5 kg / week" highlight />
            <StatCard title="TOTAL DURATION" locked />
          </div>

          <div
            className="relative h-[280px] p-10 w-full overflow-hidden rounded-[36px] border border-[#F2F2F2] bg-white"
            style={{ boxShadow: "0px 0px 2px rgba(0,0,0,0.25)" }}
          >
            {/* ── Top section: badges + headline ── */}
            <div className="absolute top-6 right-5 left-5 flex flex-col gap-2">
              <div className="flex flex-row items-center gap-[3px]">
                {/* Location Badge */}
                <div className="flex h-[23.67px] items-center rounded-[22px] bg-[#E9074B] px-[10px]">
                  <span className="text-[11.5px] font-medium whitespace-nowrap text-white">
                    {locationLabel}
                  </span>
                </div>
                {/* Fitness Badge */}
                <div
                  className="flex h-[23.67px] items-center rounded-[17px] px-[10px]"
                  style={{
                    background: "rgba(151,201,255,0.16)",
                    border: "0.56px solid #007AFF",
                  }}
                >
                  <span className="text-[11.5px] font-medium whitespace-nowrap text-[#007AFF]">
                    {fitnessLabel}
                  </span>
                </div>
              </div>

              {/* Headline */}
              <p className="m-0 w-[304px] text-[26px] leading-8 font-bold text-[#181831]">
                Your <span className="text-[#E9074B]">{diffInDays} days</span> {goalText} plan
                is taking shape
              </p>
            </div>

            {/* ── Exercise list ── */}
            <div className="absolute top-[158px] right-5 left-5 flex flex-col gap-[6px]">
              {exercises.map((ex, i) => (
                <div
                  key={i}
                  className="relative flex h-6 flex-row items-center"
                >
                  <div className="h-[11px] w-[11px] shrink-0 rounded-full bg-[#007AFF]" />
                  <span className="ml-[18px] text-[13.25px] leading-[14px] font-bold text-[#181831]">
                    {ex.name}
                  </span>
                  <span
                    className="absolute text-[13.25px] leading-[14px] font-medium text-[#A2A2B7]"
                    style={{ right: 40, filter: "blur(3px)" }}
                  >
                    {ex.sets} sets × {ex.reps} reps
                  </span>
                  <span className="absolute right-0">
                    <Image src="/lock.png" alt="lock" height={20} width={20} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={next}
          className="mx-auto mt-6 flex w-full max-w-100 cursor-pointer items-center justify-center rounded-2xl bg-[#E9074B] py-6 text-lg text-white"
        >
          Complete My Profile
        </Button>
      </div>
    </div>
  )
}

const StatCard = ({
  title,
  value,
  highlight,
  locked,
}: {
  title: string
  value?: string
  highlight?: boolean
  locked?: boolean
}) => {
  return (
    <div
      className={`relative flex h-[110px] flex-col justify-between overflow-hidden rounded-[22px] border bg-white px-5 py-5 ${
        highlight ? "border-[#E9074B]" : "border-gray-200"
      }`}
    >
      {/* BLURRED CONTENT LAYER */}
      <div className={locked ? "opacity-40 blur-[3px] select-none" : ""}>
        <p className="text-[12px] font-semibold tracking-wide text-[#1C1C1E] uppercase">
          {title}
        </p>

        {!locked && value && (
          <div className="mt-1 flex items-baseline gap-1">
            <span
              className={`text-[34px] leading-none font-bold ${
                highlight ? "text-[#E9074B]" : "text-black"
              }`}
            >
              {value.split(" ")[0]}
            </span>
            <span className="text-[16px] text-[#1C1C1E]">
              {value.split(" ").slice(1).join(" ")}
            </span>
          </div>
        )}

        {/* Fake bars shown when locked (blurred behind the lock icon) */}
        {locked && (
          <div className="mt-3 flex items-end gap-1.5">
            {[18, 28, 22, 32, 26, 20].map((h, i) => (
              <div
                key={i}
                className="w-4 rounded-sm bg-gray-400"
                style={{ height: h }}
              />
            ))}
          </div>
        )}
      </div>

      {/* LOCK ICON — centered on top of blur */}
      {locked && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black shadow-lg">
            <LockKeyhole color="white" />
          </div>
        </div>
      )}
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
