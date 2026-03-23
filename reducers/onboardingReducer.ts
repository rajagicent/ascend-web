/* eslint-disable @typescript-eslint/no-explicit-any */
// /reducers/onboardingReducer.ts
import { State } from "../types";

export const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };

    case "UPDATE":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.key]: action.payload.value,
        },
      };

    default:
      return state;
  }
};