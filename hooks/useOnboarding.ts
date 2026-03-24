// /hooks/useOnboarding.ts
"use client";

import { useContext } from "react";
import { OnboardingContext } from "../app/provider/ContextProvicer";

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  
  return context;
};