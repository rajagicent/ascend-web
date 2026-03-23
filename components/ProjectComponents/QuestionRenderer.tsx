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
    <div className="mx-auto max-w-5xl  p-6">
      <h2 className=" text-center text-[#191717] text-2xl font-bold">
        {question.label}
      </h2>
      
      <p className="text-center  mb-10 text-[18px] leading-6.5 text-[#19171799]">
        {question.subLabel}
      </p>

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        {question.options.map((opt: any) => {
          const label = typeof opt === "string" ? opt : opt.label
          const val = typeof opt === "string" ? opt : opt.value

          return (
            <button
              key={val}
              className="mb-2 w-full text-start cursor-pointer rounded bg-[#F0F0F0]/40 p-3 hover:bg-gray-100"
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
