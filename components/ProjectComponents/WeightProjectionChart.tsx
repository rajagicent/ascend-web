/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { week: "1", value: 200 },
  { week: "4", value: 58 },
  { week: "8", value: 172 },
  { week: "12", value: 10 },
];

export const WeightProjectionChart = () => {
  return (
    <div className="w-full h-[140px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          
          {/* Gradient */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E9074B" stopOpacity={1} />
              <stop offset="100%" stopColor="#E9074B" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid
            strokeDasharray="6 6"
            vertical={false}
            stroke="#E5E7EB"
          />

          <XAxis dataKey="week" hide />
          <YAxis hide />

          {/* Line + Center Dot */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#lineGradient)"
            strokeWidth={4}
            dot={(props: any) => {
              const { cx, cy, index } = props;

              if (index === 1) {
                return (
                  <g>
                    <circle cx={cx} cy={cy} r={12} fill="#E9074B" opacity={0.2} />
                    <circle cx={cx} cy={cy} r={6} fill="#E9074B" />
                  </g>
                );
              }
              return null;
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};