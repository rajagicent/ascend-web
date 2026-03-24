"use server"

import { ENDPOINT } from "@/app/api/constents/endPoint"
import { serverApi } from "@/utils/serverApi"

// Payload for autosaving to Redis
export interface RedisSavePayload {
  variation_id: number;
  answers: any[];
  currentStep?: number;
  email?: string | null;
  isEmailVerified?: boolean;
}

// Payload for final submission
export interface FinalSubmitPayload {
  variation_id: number;
  goal: string;
  answers: any[];
}

// Fetch the user's resumed state from Redis based on UUID
export async function fetchResumeSurveyHistory(uuid: string) {
  
  try {
    const res = await serverApi.post(ENDPOINT.REDIS_GET_QUESTIONS, {
      variation_id: 4
    }, {
      headers: {
        "x-session-id": uuid
      }
    })
    return { success: true, data: res.data }
  } catch (error: any) {
    const status = error?.response?.status;
    if (status !== 404) {
      console.error("fetchResumeSurveyHistory Error:", error?.response?.data || error.message)
    }
    return { success: false, error: error?.response?.data || "Failed to fetch resume history", data: null }
  }
}

// Autosave to Redis
export async function saveRedisSurveyHistory(payload: RedisSavePayload, uuid: string) {
  try {
    const res = await serverApi.post(ENDPOINT.REDIS_SAVE_QUESTIONS, payload, {
      headers: {
        "x-session-id": uuid
      }
    })
    return { success: true, data: res.data }
  } catch (error: any) {
    console.error("saveRedisSurveyHistory Error:", error?.response?.data || error.message)
    return { success: false, error: error?.response?.data || "Failed to save survey history" }
  }
}

// Final Submission
export async function submitFinalSurvey(payload: FinalSubmitPayload) {
  try {

    console.log(payload);

    const res = await serverApi.post(ENDPOINT.QUESANSWER_SUBMIT, payload)
    return { success: true, data: res.data }
  } catch (error: any) {
    console.error("submitFinalSurvey Error:", error?.response?.data || error.message)
    return { success: false, error: error?.response?.data || "Failed to submit final survey" }
  }
}
