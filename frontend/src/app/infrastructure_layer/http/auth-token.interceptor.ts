import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccessTokenProvider } from '../common/abstractions/access-token.provider';

const AUTH_ENDPOINTS = ['/auth/login', '/auth/refresh']; // bei Bedarf anpassen

function shouldSkip(url: string): boolean {
  return AUTH_ENDPOINTS.some(ep => url.includes(ep));
}

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  if (shouldSkip(req.url)) return next(req);

  const token = inject(AccessTokenProvider).getAccessToken();
  if (!token) return next(req);

  const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  return next(authReq);
};
