import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  // Create a new Axios instance
  const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL || "https://example.com/api", // Update baseURL
  });

  // Interceptors (optional)
  axiosInstance.interceptors.request.use(
    (config) => {
      // Modify request config if needed
      console.log("Request:", config);
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle errors globally
      console.error("Response error:", error);
      return Promise.reject(error);
    }
  );

  // Inject Axios into Nuxt
  nuxtApp.provide("axios", axiosInstance);

  // nuxtApp.vueApp.config.globalProperties.$axios = axiosInstance;
});
