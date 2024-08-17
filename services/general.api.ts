import { apiService } from ".";
import {
  ListItemPayload,
  GetListingsParamsProps,
  ListingsByDateRangeParamsProps,
  UpdateListingPayload,
  CreateBookingPayload,
  PageLimitParams,
  UpdateScheduleProps,
} from "@/types";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// categories

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

// Listings
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

// get single user listing
export const myListing = async (id: number) => {
  try {
    const response = await apiService.get(`/listings/${id}`);
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

// delete single user listing
export const delMyListing = async (id: number) => {
  const token = getToken();
  try {
    const response = await apiService.delete(`/me/listings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateListingAvailability = async ({
  params,
  payload,
}: {
  params: { id: number };
  payload: { status: string };
}) => {
  const token = getToken();
  const { id } = params;
  try {
    const response = await apiService.patch(
      `/me/listing_availability/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateSchedule = async ({
  params,
  payload,
}: {
  params: { id: number };
  payload: UpdateScheduleProps;
}) => {
  const token = getToken();
  const { id } = params;
  try {
    const response = await apiService.put(`/schedules/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

// Bookings
export const createBooking = async (payload: CreateBookingPayload) => {
  const token = getToken();
  try {
    const response = await apiService.post(`/bookings`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const cancelBooking = async (id: number) => {
  const token = getToken();
  try {
    const response = await apiService.patch(`/bookings/${id}/cancel`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const acceptBooking = async (id: number) => {
  const token = getToken();
  try {
    const response = await apiService.patch(`/bookings/${id}/accept`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const declineBooking = async (id: number) => {
  const token = getToken();
  try {
    const response = await apiService.patch(`/bookings/${id}/decline`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const confirmBookingPayment = async (id: string) => {
  const token = getToken();
  try {
    const response = await apiService.patch(`/bookings/${id}/confirm-payment`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const confirmBookingPickup = async (id: string) => {
  const token = getToken();
  try {
    const response = await apiService.patch(`/bookings/${id}/confirm-pickup`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const confirmBookingReturn = async (id: string) => {
  const token = getToken();
  try {
    const response = await apiService.patch(`/bookings/${id}/confirm-return`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const getRenterBookings = async (params: PageLimitParams) => {
  const { rental_status, page, limit } = params;
  const token = getToken();
  try {
    const response = await apiService.get(
      `/bookings/renter?rental_status=${rental_status}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const getListerBookings = async (params: PageLimitParams) => {
  const { lister_status, page, limit } = params;
  const token = getToken();
  try {
    const response = await apiService.get(
      `/bookings/lister?lister_status=${lister_status}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const getSingleBooking = async (id: string) => {
  const token = getToken();
  try {
    const response = await apiService.get(`/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

// User Profile

export const sendForgotPassword = async (payload: { email: string }) => {
  const token = getToken();
  try {
    const response = await apiService.patch(`/send-forgot-password`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const changePassword = async (payload: { newPassword: string }) => {
  const token = getToken();
  try {
    const response = await apiService.patch(
      `/forgot-password?token=${token}`,
      payload
    );
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const resetPassword = async (payload: { newPassword: string }) => {
  const token = getToken();
  try {
    const response = await apiService.patch(`/reset-password`, payload);
    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export const uploadProfilePic = async (payload: { image: File }) => {
  const token = getToken();
  try {
    const response = await apiService.patch(`/uploads`, payload, {
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
