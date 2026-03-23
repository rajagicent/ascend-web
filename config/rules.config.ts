/* eslint-disable @typescript-eslint/no-explicit-any */
// /config/rules.config.ts

export const applyRules = (flow: string[], answers: any) => {
  return flow.filter((step) => {

    // Skip diet if fitness goal only
    if (step === "q12" && answers.q1 === "fitness") {
      return false;
    }

    // Female-specific question example
    if (step === "q10" && answers.q2 !== "female") {
      return false;
    }

    return true;
  });
};