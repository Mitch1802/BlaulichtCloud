import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { AppLoginFacade } from '../abstractions/app.login.facade';
import { LoginCredentials, Tokens } from '../models/login.models';
import { InfraLoginFacade } from 'src/app/infrastructure_layer/login/abstractions/infra.login.facade';
import { LoginResponseDto } from 'src/app/infrastructure_layer/login/models/login-response.dto';
import { environment } from 'src/environments/environment';

const SESSION_TOKENS_KEY = 'auth:tokens';

@Injectable({ providedIn: 'root' })
export class AppLoginService extends AppLoginFacade {
  private infra = inject(InfraLoginFacade);

  private readonly _tokens$ = new BehaviorSubject<Tokens | null>(null);
  tokens$ = this._tokens$.asObservable();
  isAuthenticated$ = this.tokens$.pipe(map(t => !!t?.accessToken));

  hydrateFromSession(): void {
    try {
      const raw = sessionStorage.getItem(SESSION_TOKENS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Tokens & { expiresAt?: string };
      const tokens: Tokens = {
        ...parsed,
        expiresAt: parsed.expiresAt ? new Date(parsed.expiresAt) : undefined
      };
      this._tokens$.next(tokens);
    } catch { }
  }

  private persist(tokens: Tokens): void {
    sessionStorage.setItem(
      SESSION_TOKENS_KEY,
      JSON.stringify({
        ...tokens,
        ...(tokens.expiresAt ? { expiresAt: tokens.expiresAt.toISOString() } : {})
      })
    );
    // TODO Ändern wenn Start Komponente geändert
    sessionStorage.setItem("Token", tokens.accessToken);
    sessionStorage.setItem('Benutzername', tokens.user!.username);
    sessionStorage.setItem('Rollen', JSON.stringify(tokens.user!.roles));
  }

  private mapDtoToDomain(dto: LoginResponseDto): Tokens {
    return {
      accessToken: dto.access_token,
      refreshToken: dto.refresh_token,
      expiresAt: dto.expires_at ? new Date(dto.expires_at) : undefined,
      user: dto.user
    };
  }

  login(credentials: LoginCredentials): Observable<Tokens> {
    return this.infra.login({ username: credentials.username, password: credentials.password }).pipe(
      map(dto => this.mapDtoToDomain(dto)),
      tap(tokens => {
        this._tokens$.next(tokens);
        this.persist(tokens);
      })
    );
  }

  hardLogout(): void {
    this._tokens$.next(null);
    sessionStorage.removeItem(SESSION_TOKENS_KEY);
  }

  getAccessTokenSync(): string | null {
    return this._tokens$.value?.accessToken ?? null;
  }

  getFooter(): string | null {
    const year = new Date().getFullYear();
    const author = environment.author;
    const footer = "Version " + environment.version + "\n" + String.fromCharCode(169) + " " + year + " by " + author;
    return footer;
  }
}
