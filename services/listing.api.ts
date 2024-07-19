import { apiService } from "./";

export const getCategories = async (token: string) => {
	try {
		const response = await apiService.get("/categories", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response?.data;
	} catch (error: any) {
		throw error;
	}
};
