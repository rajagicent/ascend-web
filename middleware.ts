import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define protected routes
  const isSubscriptionPage = pathname.startsWith('/subscription')
  const isCreatePasswordPage = pathname.startsWith('/create-password')
  const isDownloadPage = pathname.startsWith('/download')

  // Get cookies
  const surveyUuid = request.cookies.get('survey_uuid')?.value
  const ascendToken = request.cookies.get('ascend_token')?.value
  const onboardingComplete = request.cookies.get('onboarding_complete')?.value

  // Logic for /subscription
  if (isSubscriptionPage && !surveyUuid) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Logic for /create-password
  // This page requires the token set during EmailGate/Subscription
  if (isCreatePasswordPage && !ascendToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Logic for /download
  // This page is the final destination after password creation
  if (isDownloadPage && !onboardingComplete) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Matching Paths
export const config = {
  matcher: ['/subscription/:path*', '/create-password/:path*', '/download/:path*'],
}
