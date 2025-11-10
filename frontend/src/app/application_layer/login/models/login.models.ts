export interface LoginCredentials {
  username: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken?: string;
  accessExpiresAt?: Date;
  refreshExpiresAt?: Date;
  user?: {
    id: string;
    username: string;
    roles: string[];
  };
}