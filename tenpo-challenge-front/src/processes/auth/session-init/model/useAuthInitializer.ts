import { useAuthStore } from "@entities/user/model/auth.store";
import { useEffect } from "react";
import { refreshTokenRequest } from "../api/refresh-api";
import { decodeJwt } from "../lib/decode-jwt";

export const useAuthInitializer = () => {
  const setLoading = useAuthStore((state) => state.setLoading);
  const logout = useAuthStore((state) => state.logout);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    async function initializeAuth() {
      try {
        const { accessToken } = await refreshTokenRequest();
        const payload = decodeJwt(accessToken);
        if (payload && payload.type === "access") {
          const user = {
            id: payload.id,
            email: payload.email,
            name: payload.name,
          };

          login(user, accessToken);
        } else {
          throw new Error("Invalid token payload");
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }
    initializeAuth();
  }, []);
};
