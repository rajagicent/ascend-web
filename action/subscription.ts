"use server";
import { ENDPOINT } from "@/app/api/constents/endPoint";
import { serverApi } from "@/utils/serverApi";

export const freeTrial = async (): Promise<{success:boolean,message:string}> => {
  try {
    const response = await serverApi.get(ENDPOINT.FREE_TRIAL);
    console.log("response",response.data)
    return response as {success:boolean,message:string};
  } catch (error: unknown) {
    console.log(error);

    throw error;
  }
};