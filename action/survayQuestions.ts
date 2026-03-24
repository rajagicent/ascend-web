import { ENDPOINT } from "@/app/api/constents/endPoint";
import { SurveyAPIResponse } from "@/types/survey";
import { serverApi } from "@/utils/serverApi";

export async function fetchSurveyQuestions(): Promise<SurveyAPIResponse | null> {
  try {
    const data = await serverApi.get<SurveyAPIResponse>(ENDPOINT.SURVAY_QUESTIONS);
    return data;
  } catch (error) {
    console.error("Error fetching survey questions:", error);
    return null;
  }
}
