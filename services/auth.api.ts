import { LoginPayload, SignupPayload } from "@/types";
import { apiService } from "./";

//authentication services

export const login = async (payload: LoginPayload) => {
	try {
		const response = await apiService.post("/auth/login", payload);
		return response?.data;
	} catch (error: any) {
		throw error;
	}
};

export const signup = async (payload: SignupPayload) => {
	try {
		const response = await apiService.post("/auth/signup", payload);
		return response?.data;
	} catch (error: any) {
		throw error;
	}
};
