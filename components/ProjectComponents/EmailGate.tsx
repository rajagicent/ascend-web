/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { signupUser, verifyOtp, resendOtpAction, checkUserEmail } from "@/action/auth"
import { useOnboarding } from "@/hooks/useOnboarding"
import Cookies from "js-cookie"

export const EmailGate = ({ next }: any) => {
  const { update, state } = useOnboarding();

  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState(state.answers["email"] || "")

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    update("email", val);
  };

  const handleSubmit = async () => {
    if (!email) return alert("Enter email")

    setLoading(true)
    const res = await checkUserEmail(email);
    if(res.data.success){
      Cookies.set("ascend_token", res.data.token, { expires: 7 });
    }
    setLoading(false)

    if (res.data.success) {
      next()
    } else {
      alert(res.message || "Email check failed")
    }
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
                placeholder="Enter Your email address"
                value={email}
                onChange={handleEmailChange}
                className="h-14 rounded-full bg-[#E0EFFF] pl-12"
              />
            </div>

           
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-10 flex items-center justify-center gap-2 py-3 cursor-pointer rounded-2xl bg-[#E9074B] text-white disabled:opacity-50"
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            Submit
          </button>
        </div>
      

      
    
  )
}