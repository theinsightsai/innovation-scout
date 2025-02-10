"use client";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://103.164.67.19:8001/api",
  // baseURL: "https://virtualoplossing.co/samiAi-laravel/public/index.php/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = localStorage.getItem("persist:root");
    if (state) {
      const stringState = JSON.parse(state);
      const stringAuth = stringState.auth;

      const token = stringAuth?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
