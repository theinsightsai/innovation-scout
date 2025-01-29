import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authorization tokens or modify headers here
    const token = localStorage.getItem("token"); // Example of adding a token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request Config:", config); // Optionally log the config for debugging
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can manipulate the response data before it reaches the component
    console.log("Response:", response);
    return response;
  },
  (error) => {
    // Handle specific errors (like 401, 500) here
    if (error.response && error.response.status === 401) {
      // Redirect to login page or show an error message for unauthorized
      console.error("Unauthorized access");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
