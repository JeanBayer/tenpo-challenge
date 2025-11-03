import { useAuthStore } from "@/entities/user/model/auth.store";
import { publicApi } from "@/shared/api/axios";
import { Link, useNavigate } from "react-router";

export interface ResponseT {
  user: User;
  accessToken: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await publicApi.post<ResponseT>("/auth/login", {
        email: "test@test.com",
        password: "123",
      });
      const { user, accessToken } = data;
      login(user, accessToken);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      LoginPage
      <Link to="/">Go to Dashboard</Link>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
