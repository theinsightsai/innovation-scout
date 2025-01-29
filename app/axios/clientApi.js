import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";

export const postApi = async (api, data) => {
  try {
    const response = await axiosInstance.post(api, data);
    return response.data;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

export const getApi = async (api) => {
  try {
    const response = await axiosInstance.get(api);
    return response.data;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};
