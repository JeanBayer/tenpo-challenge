import { publicApi } from "@shared/api/axios";
import type { LoginCredentials, LoginResponse } from "../model/types";

export const loginRequest = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const { data } = await publicApi.post<LoginResponse>(
    "/auth/login",
    credentials
  );
  return data;
};
