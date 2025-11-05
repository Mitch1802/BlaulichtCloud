export interface LoginResponseDto {
  access_token: string;
  refresh_token?: string;
  expires_at?: string;

  user: {
    id: string;
    username: string;
    roles: string[];
  };
}
