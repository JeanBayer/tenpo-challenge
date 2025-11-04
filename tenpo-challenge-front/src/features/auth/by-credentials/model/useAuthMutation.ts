import { useAuthStore } from "@entities/user/model/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { loginRequest, logoutRequest } from "../api/auth-api";

export const useAuthMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      login(data.user, data.accessToken);
      queryClient.invalidateQueries();
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      logout();
      queryClient.invalidateQueries();
      navigate("/login");
    },
  });

  return {
    login: {
      mutate: loginMutation.mutate,
      isPending: loginMutation.isPending,
      isError: loginMutation.isError,
      isSuccess: loginMutation.isSuccess,
      error: loginMutation.error,
    },
    logout: {
      mutate: logoutMutation.mutate,
      isPending: logoutMutation.isPending,
      isError: logoutMutation.isError,
      isSuccess: logoutMutation.isSuccess,
      error: logoutMutation.error,
    },
  };
};
