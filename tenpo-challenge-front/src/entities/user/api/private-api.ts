import { createApiClient, publicApi } from "@shared/api/axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../model/auth.store";

const privateApi = createApiClient();

privateApi.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

privateApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    try {
      const { data } = await publicApi.post("/auth/refresh");
      const newAccessToken = data.accessToken;

      useAuthStore.getState().setAccessToken(newAccessToken);

      const headerToken = `Bearer ${newAccessToken}`;
      privateApi.defaults.headers.common.Authorization = headerToken;
      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = headerToken;

      return privateApi(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    }
  }
);

export { privateApi };
