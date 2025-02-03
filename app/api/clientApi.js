"use client";
import axiosInstance from "./axiosInstance";
import { ToastMessage } from "@/components";

export const postApi = async (api, data) => {
  try {
    const response = await axiosInstance.post(api, data);
    return {
      error: false,
      data: response.data,
    };
  } catch (error) {
    return {
      error: true,
      message: error?.response?.data?.message || "Something went wrong.",
    };
  }
};

export const getApi = async (api) => {
  try {
    const response = await axiosInstance.get(api);
    return response.data;
  } catch (error) {
    ToastMessage("error", error?.response?.data?.message);
    return null;
  }
};
