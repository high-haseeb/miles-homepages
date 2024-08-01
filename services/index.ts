import axios from "axios";

import { API_URL } from "@/constants";

const token = localStorage.getItem("token");

export const apiService = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

apiService.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
