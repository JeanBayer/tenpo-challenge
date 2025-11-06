import { publicApi } from "@shared/api/axios";
import type { RefreshResponse } from "../model/types";

export const refreshTokenRequest = async (): Promise<RefreshResponse> => {
  const { data } = await publicApi.post<RefreshResponse>("/auth/refresh");
  return data;
};
