import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Input";
import { Label } from "@shared/ui/Label";
import { useForm } from "react-hook-form";
import type { LoginCredentials } from "../model/types";
import { useLoginMutation } from "../model/useLoginMutation";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();
  const { login } = useLoginMutation();

  const onSubmit = (data: LoginCredentials) => {
    login.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-sm mx-auto p-4"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          placeholder="test@test.com"
          id="email"
          aria-invalid={!!errors.email}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          placeholder="password123"
          id="password"
          aria-invalid={!!errors.password}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password must be at least 3 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      {login.isError && (
        <div className="p-3 rounded-md bg-destructive/10 border border-destructive/50">
          <p className="text-sm text-destructive">
            Login failed. Please check your credentials.
          </p>
        </div>
      )}

      <Button type="submit" disabled={login.isPending} className="w-full">
        {login.isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};
