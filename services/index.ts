import axios from "axios";

import { API_URL } from "@/constants";

export const apiService = axios.create({
	baseURL: API_URL,
	responseType: "json",
});
