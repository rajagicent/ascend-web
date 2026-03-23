/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MoveRight } from "lucide-react";
import { useState } from "react";

export const NameQuestion = ({ question, update, next }: any) => {
  const [name, setName] = useState("");

  const handleContinue = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    update(question.id, name);
    console.log("Name:", name);

    next();
  };

  const handleSkip = () => {
    update(question.id, null);
    next();
  };

  return (
   <div className="flex min-h-screen px-4 w-full flex-col items-center pt-10 pb-4 md:min-h-[calc(100vh-200px)]">

      {/* TOP */}
      <div className="flex-1 w-full px-4">
        <p className="text-sm text-gray-500 mb-2">
          WE’RE SO GLAD YOU’RE HERE
        </p>

        <h2 className="text-[#191717] text-2xl font-semibold mb-2">
          {question.label}
        </h2>

        <p className="text-gray-500 mb-6">
          Your name or nickname—whatever you go by.
        </p>

        {/* INPUT */}
        <input
          type="text"
          placeholder="e.g. Alex, Jess, coach, MamaBea"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-100 outline-none"
        />
      </div>

      {/* BOTTOM */}
      <div className="flex w-full flex-col justify-center items-center">
        <button
          onClick={handleContinue}
          className="w-full max-w-100 flex items-center justify-center gap-4 bg-[#E9074B] cursor-pointer text-white py-3 rounded-xl font-semibold"
        >
          Let’s Go <MoveRight/>
        </button>

        <button
          onClick={handleSkip}
          className="w-full mt-3 max-w-100 border py-3 rounded-2xl cursor-pointer text-gray-500"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};