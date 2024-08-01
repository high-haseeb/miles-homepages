import { apiService } from ".";
import { ListItemPayload } from "@/types";

const token = localStorage.getItem("token");

export const getCategories = async () => {
  try {
    const response = await apiService.get("/categories");
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const createListing = async (payload: ListItemPayload) => {
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
