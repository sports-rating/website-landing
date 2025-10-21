import axios from "axios";
import { useAuthStore } from "@/stores/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const api = axios.create({
    baseURL: config.public.apiBase,
  });

  

  if (process.client) {
    const authStore = useAuthStore();

    api.interceptors.request.use((config) => {
       const lang = localStorage.getItem("lang") || "ru"; 
        config.headers["Accept-Language"] = lang;
      if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
      }
      return config;
    });

    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            const refreshResponse = await axios.post(
              `${config.public.apiBase}/user/refresh-token/`,
              { refresh: authStore.refreshToken }
            );

            authStore.token = refreshResponse.data.token;
            error.config.headers.Authorization = `Bearer ${authStore.token}`;
            return api.request(error.config);
          } catch (refreshError) {
            authStore.logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  nuxtApp.provide("api", api);
});
