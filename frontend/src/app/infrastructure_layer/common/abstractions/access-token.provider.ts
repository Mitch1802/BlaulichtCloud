export abstract class AccessTokenProvider {
  abstract getAccessToken(): string | null;
}
