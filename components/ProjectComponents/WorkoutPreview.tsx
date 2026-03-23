"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const workouts = [
  {
    title: "Squats",
    img: "/workout/squat.png",
    meta: "4 sets × 10 reps",
    rest: "60s rest",
  },
  {
    title: "Overhead Press",
    img: "/workout/press.png",
    meta: "4 sets × 10 reps",
    rest: "60s rest",
  },
  {
    title: "Pull-ups",
    img: "/workout/pullup.png",
    meta: "3 sets × 10 reps",
    rest: "60s rest",
  },
];

const reviews = [
  {
    text: "Finally a plan that actually fits my life. I've already lost 4 lbs in 2 weeks!",
    name: "Sarah K.",
  },
  {
    text: "Super easy to follow. Love the structure and flexibility.",
    name: "John D.",
  },
  {
    text: "Best fitness app I’ve used. Clean UI and great workouts.",
    name: "Aman S.",
  },
  {
    text: "Helped me stay consistent. Highly recommended!",
    name: "Riya M.",
  },
];

export const WorkoutPreview = () => {
  return (
    <div className="mt-6">

      {/* DARK CARD */}
      <div className="bg-black text-white rounded-2xl p-4 mb-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-400">PREVIEW</span>
          <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
            Mon, May 12
          </span>
        </div>

        <h3 className="text-xl font-bold mb-3">
          DAY 1 <span className="text-gray-400 text-sm">FOUNDATION</span>
        </h3>

        {/* WORKOUT LIST */}
        <div className="space-y-3">
          {workouts.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-[#1C1C1E] p-3 rounded-xl border border-gray-700"
            >
              <Image
                src={item.img}
                alt={item.title}
                width={50}
                height={50}
                className="rounded-lg"
              />

              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs text-gray-400">{item.meta}</p>
                <p className="text-xs text-gray-500">{item.rest}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REVIEW SLIDER */}
      <Swiper spaceBetween={16} slidesPerView={1}>
        {reviews.map((r, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white rounded-2xl p-4 shadow">

              {/* STARS */}
              <div className="text-yellow-400 text-sm mb-2">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-sm text-gray-700 mb-3">
                “{r.text}”
              </p>

              <p className="text-xs text-gray-500 mb-2">
                — {r.name}
              </p>

              {/* DOTS */}
              <div className="flex justify-center gap-1 mt-2">
                {reviews.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 w-1.5 rounded-full ${
                      i === idx ? "bg-red-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};