/* eslint-disable @typescript-eslint/no-explicit-any */
// /config/flow.config.ts
import { applyRules } from "./rules.config";

export const buildFlow = (answers: any) => {
  const flow = [
    "q1","q2","q3","q4","q5","q6","q7","q8"
  ];
console.log("Flow:", flow);
  // 👉 Q9 checkpoint
  // flow.push("insight", "email_gate");
  flow.push("email_gate","insight");


  flow.push("q9","q10","q11","q12","q13","q14","q15");

  // 👉 Q14 checkpoint
  flow.push("checkpoint");

  flow.push("q16","q17","q18","q19","q20","q21");

  flow.push( "complete");

  return applyRules(flow, answers);
};