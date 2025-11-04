import { useAuthStore } from "@entities/user/model/auth.store";
import { Spinner } from "@shared/ui/Spinner";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const PublicRoute = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) return <Spinner message="Verificando sesión..." />;
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
};
