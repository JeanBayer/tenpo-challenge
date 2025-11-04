import { useAuthStore } from "@entities/user/model/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logoutRequest } from "../api/logout-api";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      logout();
      queryClient.invalidateQueries();
      navigate("/login", {
        replace: true,
      });
    },
  });

  return {
    logout: {
      mutate: logoutMutation.mutate,
      isPending: logoutMutation.isPending,
      isError: logoutMutation.isError,
      isSuccess: logoutMutation.isSuccess,
      error: logoutMutation.error,
    },
  };
};
