export interface JwtPayload {
  id: string;
  email: string;
  name: string;
  type?: 'access' | 'refresh'; // Tipo de token
}

export interface JwtPayloadWithMetadata extends JwtPayload {
  sub: string; // Subject, typically the user ID
  iat: number; // Issued at time
  exp: number; // Expiration time
}
