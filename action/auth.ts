"use server";

import { ENDPOINT } from "@/app/api/constents/endPoint";
import { serverApi } from "@/utils/serverApi";
import { cookies } from "next/headers";

export async function signupUser(payload: { email: string }) {
  try {
    const response = await serverApi.post(ENDPOINT.USER_SIGNUP, payload, {
      disableAuth: true,
    });

    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function verifyOtp(payload: {
  email: string;
  otp: string;
  password: string;
}) {
  try {
    
    const response: any = await serverApi.post(ENDPOINT.OTP_VERIFY, payload, {
      disableAuth: true,
    });
    console.log(response);

    // If the API returns a token, set it in cookies
    const tokenData = response?.token || response?.data?.token;
    if (tokenData) {
      const cookieStore = await cookies();
      cookieStore.set("ascend_token", tokenData, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    }

    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function resendOtpAction(email: string) {
  try {
    const response = await serverApi.post(ENDPOINT.OTP_RESEND, { email }, {
        disableAuth: true
    });
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
