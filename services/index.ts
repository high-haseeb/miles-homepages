import { getCookie } from "cookies-next";
import axios from "axios";

import { API_URL } from "@/constants";

export const getToken = (context?: { req?: any; res?: any }) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  } else {
    return getCookie("token", context) as string | null;
  }
};

export const createApiService = (token?: string) => {
  return axios.create({
    baseURL: API_URL,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    responseType: "json",
  });
};

export const apiService = createApiService();

apiService.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
