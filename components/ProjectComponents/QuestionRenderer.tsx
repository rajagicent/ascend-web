/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

export default function QuestionRenderer({
  question,
  value,
  update,
  next,
}: any) {
  if (!question.options) return null

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h2 className="text-center text-2xl font-bold text-[#191717]">
        {question.label}
      </h2>

      <p className="mb-10 text-center text-[18px] leading-6.5 text-[#19171799]">
        {question.subLabel}
      </p>

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        {question.options.map((opt: any) => {
          const label = typeof opt === "string" ? opt : opt.label
          const val = typeof opt === "string" ? opt : opt.value
          const isActive = value === val

          return (
            <button
              key={val}
              className={`w-full cursor-pointer rounded-md p-4 text-start transition-all duration-200 ${
                isActive
                  ? "border border-[#E9074B] bg-white text-black"
                  : "border border-gray-200 bg-[#F0F0F0]/40 hover:bg-gray-100"
              } `}
              onClick={() => {
                update(question.id, val)

                if (question.autoNext) {
                  next()
                }
              }}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
