import { Injectable, inject } from '@angular/core';
import { AccessTokenProvider } from 'src/app/infrastructure_layer/common/abstractions/access-token.provider';
import { AppLoginFacade } from 'src/app/application_layer/login/abstractions/app.login.facade';

@Injectable({ providedIn: 'root' })
export class AccessTokenProviderAdapter extends AccessTokenProvider {
  private auth = inject(AppLoginFacade);

  getAccessToken(): string | null {
    return this.auth.getAccessTokenSync()
        ?? JSON.parse(sessionStorage.getItem('auth:tokens') || 'null')?.accessToken
        ?? null;
  }
}
