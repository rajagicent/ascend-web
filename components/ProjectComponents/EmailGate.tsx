/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export const EmailGate = ({ next }: any) => {
  const [email, setEmail] = useState("")

  const handleSubmit = async () => {
    if (!email) return alert("Enter email")

    console.log("Email Submitted:", email)

    // 🔥 API CALL HERE
    // await fetch("/api/submit-email")

    next()
  }

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-6 pt-10">
      <h2 className="mb-2 text-center text-2xl font-semibold text-[#191717]">
        Your Results are ready.
      </h2>

      <p className="mb-8 text-center text-[#191717]">
        Enter your email to see your personalized projection.
      </p>

      <div className="space-y-4">
        <div className="relative">
          <Image
            src="/email.png"
            height={40}
            width={40}
            alt="email"
            className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
          />

          <Input
            type="email"
            placeholder="Enter Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 rounded-full bg-[#E0EFFF] pl-12"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-10 py-3 cursor-pointer rounded-2xl bg-[#E9074B] text-white"
      >
        Submit
      </button>
    </div>
  )
}