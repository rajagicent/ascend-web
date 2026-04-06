"use client"
import { Crown, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { freeTrial } from "@/action/subscription";
import CongratulationsPopup from "@/components/ui/CongratulationsPopup";
import { useOnboarding } from "@/hooks/useOnboarding"
import { submitFinalSurvey } from "@/action/redisApi"

export default function SubscriptionClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isAnswerSubmit, setIsAnswerSubmit] = useState(false);
  const { state, questionsMap, uuid } = useOnboarding();

  const handleStartPlan = async () => {
    if (!uuid) {
      console.warn("No uuid found, using fallback from localStorage");
    }
    
    try {
      if (!state || !state.answers) {
        console.error("State or answers missing in context");
        return;
      }

      const answersArray = Object.entries(state.answers)
        .filter(([key]) => key !== "email")
        .map(([key, value]) => {
          const q = questionsMap[key]

          let answerText = ""
          let answerId = ""

          if (q && q.options) {
            if (Array.isArray(value)) {
              const labels = q.options
                .filter((opt) => value.includes(opt.value))
                .map((opt) => opt.label)
              answerText =
                labels.length > 0 ? labels.join(", ") : value.join(", ")
              answerId = value.join(", ")
            } else {
              const opt = q.options.find((o) => o.value === value)
              answerText = opt ? opt.label : String(value)
              answerId = String(value)
            }
          } else {
            answerText =
              typeof value === "object" ? JSON.stringify(value) : String(value)
            answerId =
              typeof value === "object" ? JSON.stringify(value) : String(value)
          }

          return {
            question_id: q ? q.id : Number(key) || 0,
            field_id: q ? q.field_id : key,
            answer_id: answerId,
            answer: answerText,
            set_id: q ? q.set_id : 0,
          }
        })

      const goalAnswer = state.answers["goal"] || ""
      let goalText = ""
      if (questionsMap["goal"] && questionsMap["goal"].options) {
        const matchingOpt = questionsMap["goal"].options.find(
          (o) => o.value === goalAnswer
        )
        goalText = matchingOpt ? matchingOpt.label : goalAnswer
      }

      const res = await submitFinalSurvey({
        variation_id: 4,
        goal: goalText || goalAnswer,
        answers: answersArray,
        uuid: uuid || localStorage.getItem("uuid") || ""
      })

      if (res.success) {
        setIsAnswerSubmit(true)
      } else {
        alert(res.error || "Failed to submit survey")
      }
    } catch (err: any) {
      console.error(err)
      alert(err.message || "An unexpected error occurred")
    }
  }

  const handleFreeTrial = async () => {
    setLoading(true);
    try {
      const response = await freeTrial();
      if (response.success) {
        setIsSubmit(true);
        handleStartPlan();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {isSubmit && isAnswerSubmit && (
        <CongratulationsPopup onSetPassword={() => router.push("/create-password")} />
      )}
      <Image
        src="/blurbg.png"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      <div className="relative z-10 container mx-auto min-h-screen flex items-center justify-center flex-col ">
        <div className="w-full mb-10 flex-col px-0 sm:px-4 items-end lg:flex-row flex">
          <div className="w-full flex-1 p-4 shrink-0 ">
            <h1 className="text-white text-center lg:text-start text-2xl md:text-4xl font-bold leading-tight">
              Train Smarter,
              <br />
              Get Stronger, Stay Consistent
            </h1>
          </div>
          <div className="flex-1 w-full">
            <Image
              src="/aico.png"
              alt="ai"
              height={100}
              width={1000}
              className="w-full shrink-0"
            />
          </div>
        </div>
        <div className="w-full container mx-auto mb-10 px-2 lg:px-20 flex items-center justify-center py-0 md:py-6">
          <div className="flex flex-col items-start md:items-center lg:flex-row w-full gap-6 lg:gap-30">
            <div className="relative rounded-3xl mx-auto w-full max-w-[330px] md:max-w-[550px] border bg-[#262626] border-[#4A4848] p-6 sm:p-8">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Crown
                    strokeWidth={0.5}
                    size={30}
                    className="text-[#FFFFFF] absolute -top-5 -left-4 -rotate-24"
                  />
                  <h2 className="text-white text-xl md:text-3xl font-medium">
                    Subscription Plan
                  </h2>
                </div>

                <div className="mb-2 w-[120px] md:w-[220px] md:max-w-xs pr-2">
                  <p className="text-gray-400 text-sm mb-1">Monthly Plan</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl md:text-6xl font-bold text-white">
                      29.99$
                    </span>
                  </div>
                  <p className="text-[#FFFFFF] text-right text-[12px] md:text-sm">
                    / Month
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 right-2 md:-right-10 h-[180px] w-[180px] md:w-[300px] md:h-[300px] translate-x-6 md:translate-x-10">
                <img
                  src="/sub.png"
                  alt="Fitness model"
                  className="w-full h-full object-cover rounded-tl-3xl"
                />
              </div>
            </div>

            <div className="text-white items-start sm:items-center lg:items-start pl-3 justify-center flex flex-col text-start w-full flex-1 md:space-y-6">
              <div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl md:text-5xl font-bold text-white line-through decoration-2">
                    29.99$
                  </span>
                  <span className="text-white">/ Month</span>
                </div>
                <p className="text-[#FFFFFF94] text-sm">
                  After trial: 29.99$ per month, auto-renewable
                </p>
              </div>

              <div className="pt-2 w-full">
                <p className="text-xl md:text-4xl text-center lg:text-start text-[#A2FEB5] font-medium">
                  <span className="">0.00$</span>
                  <span className="ml-2">for first 3 months</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={loading}
          onClick={handleFreeTrial}
          className="text-white py-2 mb-6 cursor-pointer rounded-md px-10 bg-[#E9074B]"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Start 3-Month Free Trial"}
        </button>
        <p className="text-white mb-4">Restore · Privacy · Terms</p>
      </div>
    </div>
  );
}
