export interface RefreshResponse {
  accessToken: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  name: string;
  type: "access" | "refresh";
  iat: number;
  exp: number;
}
