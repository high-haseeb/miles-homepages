import axios from "axios";
import { parse } from "cookie";

import { API_URL } from "@/constants";

const getToken = (req?: Request) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  } else if (req) {
    const cookies = parse(req.headers.get("cookie") || "");
    return cookies.token || null;
  }
  return null;
};

export const apiService = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

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
