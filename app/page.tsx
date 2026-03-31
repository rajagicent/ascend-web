import { fetchSurveyQuestions } from "@/action/survayQuestions"
import { fetchResumeSurveyHistory } from "@/action/redisApi";
import { OnboardingProvider } from "@/app/provider/ContextProvicer"
import OnboardingFlow from "@/components/ProjectComponents/OnboardingFlow"
import { cookies } from "next/headers";
import crypto from "crypto";

// This is now a Server Component
export default async function Page() {
  const cookieStore = await cookies();
  let uuid = cookieStore.get("survey_uuid")?.value;
  let isNewUuid = false;

  console.log("uuid", uuid);

  // Generate a new UUID if it doesn't exist
  if (!uuid) {
    uuid = crypto.randomUUID();
    isNewUuid = true;
  }

  // Fetch survey configuration and resume data concurrently
  // (If it's a new UUID, skip fetching resume data to perfectly save a request)
  const [surveyData, resumeRes] = await Promise.all([
    fetchSurveyQuestions(),
    !isNewUuid ? fetchResumeSurveyHistory(uuid) : Promise.resolve({ success: false, data: null })
  ]);

  if (!surveyData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl">Failed to load survey. Please try again later.</h1>
      </div>
    );
  }

  return (
    <OnboardingProvider 
      surveyData={surveyData} 
      uuid={uuid} 
      initialResumeData={resumeRes.success ? resumeRes.data : null}
      isNewUuid={isNewUuid}
    >
      <OnboardingFlow />
    </OnboardingProvider>
  );
}
