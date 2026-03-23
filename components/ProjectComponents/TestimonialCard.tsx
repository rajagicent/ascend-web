import React, { useState, useEffect, useRef, useCallback } from "react";

const testimonials = [
  {
    quote: '"Finally a plan that actually fits my life. I\'ve already lost 4 lbs in 2 weeks!"',
    author: "Sarah M.",
  },
  {
    quote: '"This is the best fitness program I\'ve ever followed. Highly recommend it!"',
    author: "James R.",
  },
  {
    quote: '"Lost 8 lbs in a month without feeling deprived. Absolutely love it!"',
    author: "Emily K.",
  },
  {
    quote: '"The plan is simple, effective, and fits perfectly into my schedule."',
    author: "Michael T.",
  },
];

const AUTO_INTERVAL = 3000;
const DRAG_THRESHOLD = 50;
const TOTAL = testimonials.length;

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#F5C518">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function TestimonialCard() {
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentOffset = useRef(0);
  const activeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync activeRef via effect, never during render
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const slideTo = useCallback((next: number) => {
    setActive(next);
    setOffset(0);
  }, []);

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % TOTAL);
    setOffset(0);
  }, []);

  const goPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + TOTAL) % TOTAL);
    setOffset(0);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, AUTO_INTERVAL);
  }, [goNext]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDragging.current = true;
    setDragging(true);
    startX.current = e.clientX;
    currentOffset.current = 0;
    if (timerRef.current) clearInterval(timerRef.current);
    setOffset(0);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    currentOffset.current = dx;
    setOffset(dx);
  }, []);

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDragging(false);
    const dx = currentOffset.current;
    if (dx < -DRAG_THRESHOLD) {
      setActive((prev) => (prev + 1) % TOTAL);
      setOffset(0);
    } else if (dx > DRAG_THRESHOLD) {
      setActive((prev) => (prev - 1 + TOTAL) % TOTAL);
      setOffset(0);
    } else {
      setOffset(0);
    }
    resetTimer();
  }, [resetTimer]);

  return (
    <div className="flex items-center justify-center my-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full  px-6 pt-5 pb-5">

        {/* Stars + social proof */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
          </div>
          <span className="text-[12.5px] text-gray-400 font-medium leading-tight">
            Joined by 1,240 people this week
          </span>
        </div>

        {/* Slider track */}
        <div
          className="overflow-hidden"
          style={{
            cursor: dragging ? "grabbing" : "grab",
            touchAction: "pan-y",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="flex"
            style={{
              width: `${TOTAL * 100}%`,
              transform: `translateX(calc(${-active * (100 / TOTAL)}% + ${offset / TOTAL}px))`,
              transition: dragging
                ? "none"
                : "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{ width: `${100 / TOTAL}%` }}
                className="flex-shrink-0"
              >
                <p className="text-[15px] text-gray-800 italic leading-relaxed mb-3 min-h-[76px]">
                  {t.quote}
                </p>
                <p className="text-[14px] text-gray-600 font-medium mb-5">
                  — {t.author}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-1">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { slideTo(i); resetTimer(); }}
              style={{
                width: i === active ? 20 : 7,
                height: 7,
                borderRadius: 999,
                background: i === active ? "#EF4444" : "#D1D5DB",
                border: "none",
                padding: 0,
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}