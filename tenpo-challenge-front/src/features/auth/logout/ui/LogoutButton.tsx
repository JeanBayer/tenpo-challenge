import { Button } from "@shared/ui/Button";
import { LogOut } from "lucide-react";
import { useLogoutMutation } from "../model/useLogoutMutation";

export const LogoutButton = () => {
  const { logout } = useLogoutMutation();

  return (
    <Button
      variant="destructive"
      onClick={() => logout.mutate()}
      disabled={logout.isPending}
    >
      <LogOut />
    </Button>
  );
};
