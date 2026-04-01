/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts"

// ✅ Types
type HeaderVariant = "projection" | "confidence" | "simple"

interface WeightGraphProps {
  data: { name: string; value: number }[]
  current?: string
  target?: string
  variant?: HeaderVariant
}

// ✅ Custom Dot (only first & last)
const CustomDot = ({ cx, cy, index, dataLength }: any) => {
  if (index === 0 || index === dataLength - 1) {
    return <circle cx={cx} cy={cy} r={5} fill="#E9074B" />
  }
  return null
}

// ✅ Header Component
const Header = ({
  variant,
  current,
  target,
}: {
  variant: HeaderVariant
  current: string
  target: string
}) => {
  if (variant === "projection") {
    return (
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">WEIGHT PROJECTION</p>

          <span className="text-[12px] flex gap-1 bg-black text-white px-2 py-1 rounded-full">
            <Image src="/flag.svg" height={18} width={18} alt="flag" />
            VACATION GOAL
          </span>
        </div>
        <p className="text-sm font-semibold text-gray-800">
          Targeting{" "}
          <span className="text-[#E9074B] font-bold">{target}</span> by August
        </p>
      </div>
    )
  }

  if (variant === "confidence") {
    return (
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">WEIGHT PROJECTION</p>
          <span className="text-[10px] bg-black text-white px-2 py-1 rounded-full">
            CONFIDENCE: HIGH
          </span>
        </div>
        <p className="text-sm font-semibold text-gray-800">
          {current} →{" "}
          <span className="text-green-600 font-bold">{target}</span>
        </p>
      </div>
    )
  }

  // ✅ Default (simple)
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-400">Current</p>
        <p className="text-base font-bold text-[#1E1B39]">{current}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-[#E9074B]">Target Goal</p>
        <p className="text-base font-bold text-[#E9074B]">{target}</p>
      </div>
    </div>
  )
}

// ✅ Main Component
const WeightGraph = ({
  data,
  current = "165 lb",
  target = "165 lb",
  variant = "simple",
}: WeightGraphProps) => {
  return (
    <div className="rounded-[32px] border border-gray-200 bg-white p-5 shadow-sm">

      {/* 🔥 Dynamic Header */}
      <Header variant={variant} current={current} target={target} />

      {/* 📊 Chart */}
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
          >
            {/* Gradient */}
            <defs>
              <linearGradient id="colorShadow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E9074B" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#E9074B" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="4 4"
              vertical={false}
            />

            {/* X Axis */}
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#9CA3AF" }}
            />

            {/* Y Axis hidden */}
            <YAxis hide domain={["dataMin", "dataMax"]} />

            {/* Area (shadow) */}
            <Area
              type="natural"
              dataKey="value"
              stroke="none"
              fill="url(#colorShadow)"
              baseValue="dataMin"
            />

            {/* Line */}
            <Line
              type="natural"
              dataKey="value"
              stroke="#E9074B"
              strokeWidth={3}
              dot={(props) => (
                <CustomDot {...props} dataLength={data.length} />
              )}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default WeightGraph