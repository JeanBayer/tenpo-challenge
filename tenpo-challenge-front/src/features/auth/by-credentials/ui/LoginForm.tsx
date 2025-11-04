import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { useForm } from "react-hook-form";
import type { LoginCredentials } from "../model/types";
import { useAuthMutation } from "../model/useAuthMutation";

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginCredentials>();
  const { login } = useAuthMutation();

  const onSubmit = (data: LoginCredentials) => {
    login.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-sm mx-auto p-4"
    >
      <Label htmlFor="email">Email</Label>
      <Input
        type="email"
        placeholder="test@test.com"
        id="email"
        {...register("email")}
      />
      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        placeholder="password123"
        id="password"
        {...register("password", {
          minLength: 3,
        })}
      />
      <Button type="submit" disabled={login.isPending} className="w-full">
        {login.isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};
