import { apiService } from ".";
import { ListItemPayload } from "@/types";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const getCategories = async () => {
  try {
    const response = await apiService.get("/categories");
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const createListing = async (payload: ListItemPayload) => {
  const token = getToken();
  try {
    const response = await apiService.post("/listings", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};
