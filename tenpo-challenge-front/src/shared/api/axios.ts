import { useAuthStore } from "@entities/user/model/auth.store";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const publicApi = axios.create({
  baseURL: API_URL,
});

const privateApi = axios.create({
  baseURL: API_URL,
});

privateApi.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

privateApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (error.response?.status === 401) {
      try {
        const { data } = await publicApi.post("/auth/refresh");
        const newAccessToken = data.accessToken;

        useAuthStore.getState().setAccessToken(newAccessToken);

        const headerToken = `Bearer ${newAccessToken}`;
        privateApi.defaults.headers.common["Authorization"] = headerToken;
        originalRequest.headers["Authorization"] = headerToken;

        return privateApi(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default privateApi;
