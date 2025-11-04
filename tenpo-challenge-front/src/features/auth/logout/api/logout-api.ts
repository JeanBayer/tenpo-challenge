import { publicApi } from "@shared/api/axios";

export const logoutRequest = async (): Promise<void> => {
  await publicApi.post("/auth/logout");
};
