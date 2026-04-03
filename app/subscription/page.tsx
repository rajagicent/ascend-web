import { fetchSurveyQuestions } from "@/action/survayQuestions"
import { fetchResumeSurveyHistory } from "@/action/redisApi";
import { OnboardingProvider } from "@/app/provider/ContextProvicer"
import SubscriptionClient from "@/components/ProjectComponents/SubscriptionClient"
import { cookies } from "next/headers";
import crypto from "crypto";

export default async function Page() {
  const cookieStore = await cookies();
  let uuid = cookieStore.get("survey_uuid")?.value;

  // Fetch survey configuration and resume data concurrently
  const [surveyData, resumeRes] = await Promise.all([
    fetchSurveyQuestions(),
    uuid ? fetchResumeSurveyHistory(uuid) : Promise.resolve({ success: false, data: null })
  ]);

  if (!surveyData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <h1 className="text-xl text-white">Failed to load survey. Please try again later.</h1>
      </div>
    );
  }

  // If no UUID, we'll generate one (fallback, though it should exist from onboarding)
  if (!uuid) {
     uuid = crypto.randomUUID();
  }

  return (
    <OnboardingProvider 
      surveyData={surveyData} 
      uuid={uuid} 
      initialResumeData={resumeRes.success ? resumeRes.data : null}
      isNewUuid={false}
    >
      <SubscriptionClient />
    </OnboardingProvider>
  );
}
