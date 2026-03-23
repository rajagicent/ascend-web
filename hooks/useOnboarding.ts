/* eslint-disable @typescript-eslint/no-explicit-any */
// /hooks/useOnboarding.ts
"use client";

import { useReducer } from "react";
import { reducer } from "../reducers/onboardingReducer";
import { buildFlow } from "../config/flow.config";
import { useEffect } from "react";

export const useOnboarding = () => {
  const [state, dispatch] = useReducer(reducer, {
    currentStep: "q1",
    answers: {},
  });

  const flow = buildFlow(state.answers);

  const next = () => {
    const i = flow.indexOf(state.currentStep);
    dispatch({ type: "SET_STEP", payload: flow[i + 1] });
  };

  const prev = () => {
    const i = flow.indexOf(state.currentStep);
    dispatch({ type: "SET_STEP", payload: flow[i - 1] });
  };

  useEffect(() => {
  const saved = localStorage.getItem("onboarding_data");

  if (saved) {
    const parsed = JSON.parse(saved);

    Object.entries(parsed).forEach(([key, value]) => {
      dispatch({
        type: "UPDATE",
        payload: { key, value },
      });
    });

    console.log("Restored Data:", parsed);
  }
}, []);

  // const update = (key: string, value: any) => {
  //   dispatch({ type: "UPDATE", payload: { key, value } });
  // };
  const update = (key: string, value: any) => {
  const updatedAnswers = {
    ...state.answers,
    [key]: value,
  };

  dispatch({
    type: "UPDATE",
    payload: { key, value },
  });

  // ✅ SAVE TO LOCAL STORAGE
  localStorage.setItem(
    "onboarding_data",
    JSON.stringify(updatedAnswers)
  );

  // ✅ DEBUG (you wanted console log)
  console.log("Saved Answers:", updatedAnswers);
};

  return { state, next, prev, update, flow };
};