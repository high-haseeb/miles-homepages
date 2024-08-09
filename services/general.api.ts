import { apiService } from ".";
import {
  ListItemPayload,
  GetListingsParamsProps,
  ListingsByDateRangeParamsProps,
  UpdateListingPayload,
} from "@/types";

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

export const getSubCategories = async (id: string) => {
  try {
    const response = await apiService.get(`/sub_categories/${id}`);
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

export const updateListing = async (
  id: string,
  payload: UpdateListingPayload
) => {
  const token = getToken();
  try {
    const response = await apiService.put(`/me/listings/${id}`, payload, {
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

export const myListings = async (page?: number) => {
  try {
    const response = await apiService.get(`/me/listings?page=${page || 1}`);
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

// Get all listings and filter by category, date, and location
export const getListings = async (params: GetListingsParamsProps) => {
  const { category, date, location } = params;
  try {
    const response = await apiService.get(
      `/listings?category=${category}&location=${location}&date=${date}`
    );
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const getListingsByDateRange = async (
  params: ListingsByDateRangeParamsProps
) => {
  const { startDate, endDate } = params;
  try {
    const response = await apiService.get(
      `/listings?startDate=${startDate}&endDate=${endDate}`
    );
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

// Get a single listing
export const getListing = async (id: string) => {
  try {
    const response = await apiService.get(`/listings/${id}`);
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const searchListings = async (searchKeyword: string) => {
  try {
    const response = await apiService.get(`/search?search=${searchKeyword}`);
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};
