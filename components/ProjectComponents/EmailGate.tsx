/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"

export const EmailGate = ({ next }: any) => {
  const [step, setStep] = useState<"form" | "otp">("form")
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleSendOtp = async () => {
    if (!email || !password) return alert("Enter email & password")

    console.log("Send OTP:", { email, password })

    // 🔥 API CALL HERE
    // await fetch("/api/send-otp")

    setStep("otp")
  }

  const handleVerifyOtp = async () => {
    const code = otp.join("")

    if (code.length !== 6) return alert("Enter full OTP")

    console.log("Verify OTP:", code)

    // 🔥 API CALL HERE
    // await fetch("/api/verify-otp")

    next()
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // clear current
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
      } else if (index > 0) {
        // move to previous
        inputsRef.current[index - 1]?.focus()
      }
    }
  }

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // 👉 Move to next input
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-6 pt-10">
      {/* STEP 1 */}
      {step === "form" && (
        <>
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
                className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400"
              />

              <Input
                placeholder="Enter Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-full bg-[#E0EFFF] pl-12"
              />
            </div>

            <div className="relative">
              <Image
                src="/lock.png"
                height={40}
                width={40}
                alt="email"
                className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400"
              />

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 rounded-full bg-[#E0EFFF] pl-12"
              />
              {/* EYE ICON */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSendOtp}
            className="mt-10 py-3 cursor-pointer rounded-2xl bg-[#E9074B] text-white"
          >
            Submit
          </button>
        </>
      )}

      {/* STEP 2 */}
      {step === "otp" && (
        <>
          <h2 className="mb-2 text-2xl font-semibold">Check your email</h2>

          <p className="mb-6 text-gray-500">
            We sent a reset link to{" "}
            <span className="text-[#545454]">{email}</span>
            enter 6 digit code that mentioned in the email
          </p>

          {/* OTP BOXES */}
          <div className="mx-auto mb-6 flex gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {(inputsRef.current[index] = el)}}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`h-13 w-13 rounded-lg border-2 text-center text-xl transition-all duration-200 outline-none ${
                  digit
                    ? "border-[#E9074B] font-semibold text-[#E9074B]"
                    : "border-gray-300 text-black"
                } focus:border-[#E9074B]`}
              />
            ))}
          </div>

          <button
            onClick={handleVerifyOtp}
            className="py-3 cursor-pointer rounded-2xl bg-[#E9074B] text-white"
          >
            Verify Code
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Haven’t got the email?{" "}
            <span className="cursor-pointer text-blue-500">Resend email</span>
          </p>
        </>
      )}
    </div>
  )
}
