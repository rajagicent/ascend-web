/* eslint-disable */

import axios, { AxiosRequestConfig, Method } from "axios";
import { cookies } from "next/headers";
 
// 1. Define a custom type that combines Axios config with our custom options
export type ApiConfig = AxiosRequestConfig & {
  disableAuth?: boolean;
  returnFullResponse?: boolean;
};
 
const coreRequest = async <T>(
  method: Method,
  url: string,
  data?: any,
  config: ApiConfig = {}
): Promise<T> => {
  const {
    disableAuth = false,
    returnFullResponse = false,
    ...axiosConfig
  } = config;
 
  const cookieStore = await cookies();
  const token = cookieStore.get("ascend_token")?.value;
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(axiosConfig.headers as Record<string, string>),
  };
 
  if (!disableAuth && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
 
  if (data instanceof FormData) {
    delete headers["Content-Type"];
  }
 
  try {
    const response = await axios({
      baseURL: process.env.BASE_URL,
      url,
      method,
      data,
      ...axiosConfig,
      headers,
    });
 
    return returnFullResponse ? (response as T) : response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error.response?.data?.message || error.message;
      console.error(`❌ ${method} ${url} Error:`, msg);
      throw new Error(msg);
    }
    throw error;
  }
};
 
export const serverApi = {
  get: <T = any>(url: string, config?: ApiConfig) =>
    coreRequest<T>("GET", url, undefined, config),
 
  post: <T = any>(url: string, data?: any, config?: ApiConfig) =>
    coreRequest<T>("POST", url, data, config),
 
  put: <T = any>(url: string, data?: any, config?: ApiConfig) =>
    coreRequest<T>("PUT", url, data, config),
 
  delete: <T = any>(url: string, config?: ApiConfig) =>
    coreRequest<T>("DELETE", url, undefined, config),
 
  request: coreRequest,
};