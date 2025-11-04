import { useAuthStore } from "@entities/user/model/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { loginRequest } from "../api/login-api";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

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

  return {
    login: {
      mutate: loginMutation.mutate,
      isPending: loginMutation.isPending,
      isError: loginMutation.isError,
      isSuccess: loginMutation.isSuccess,
      error: loginMutation.error,
    },
  };
};
