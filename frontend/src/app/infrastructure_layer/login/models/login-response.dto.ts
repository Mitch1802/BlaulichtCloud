export interface LoginResponseDto {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    username: string;
    roles: string[];
  };
  access_token_expiration: string;
  refresh_token_expiration: string; 
}
