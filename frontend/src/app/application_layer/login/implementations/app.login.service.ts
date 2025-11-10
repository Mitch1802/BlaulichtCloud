import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { AppLoginFacade } from '../abstractions/app.login.facade';
import { LoginCredentials, Tokens } from '../models/login.models';
import { InfraLoginFacade } from 'src/app/infrastructure_layer/login/abstractions/infra.login.facade';
import { LoginResponseDto } from 'src/app/infrastructure_layer/login/models/login-response.dto';
import { environment } from 'src/environments/environment';

const SESSION_TOKENS_KEY = 'auth:tokens';

function parseDdMmYyyyTHHmmss(value?: string): Date | undefined {
  if (!value) return undefined;
  // Erwartet "dd.MM.yyyyTHH:mm:ss"
  const m = /^(\d{2})\.(\d{2})\.(\d{4})T(\d{2}):(\d{2}):(\d{2})$/.exec(value);
  if (!m) return undefined;
  const [, dd, mm, yyyy, HH, MM, SS] = m.map(Number);
  // Date: Monate 0-basiert
  return new Date(yyyy, mm - 1, dd, HH, MM, SS);
}

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
      const parsed = JSON.parse(raw) as Omit<Tokens, 'accessExpiresAt' | 'refreshExpiresAt'> & {
        accessExpiresAt?: string; refreshExpiresAt?: string;
      };
      this._tokens$.next({
        ...parsed,
        accessExpiresAt: parsed.accessExpiresAt ? new Date(parsed.accessExpiresAt) : undefined,
        refreshExpiresAt: parsed.refreshExpiresAt ? new Date(parsed.refreshExpiresAt) : undefined,
      });
    } catch {}
  }

  private persist(tokens: Tokens): void {
    // Speichern neu
    sessionStorage.setItem(SESSION_TOKENS_KEY, JSON.stringify({
      ...tokens,
      accessExpiresAt: tokens.accessExpiresAt?.toISOString(),
      refreshExpiresAt: tokens.refreshExpiresAt?.toISOString(),
    }));
    // Speichern alt TODO
    sessionStorage.setItem("Token", tokens.accessToken);
    sessionStorage.setItem('Benutzername', tokens.user!.username);
    sessionStorage.setItem('Rollen', JSON.stringify(tokens.user!.roles));
  }

  private mapDtoToDomain(dto: LoginResponseDto): Tokens {
    return {
      accessToken: dto.access_token,
      refreshToken: dto.refresh_token || undefined,
      accessExpiresAt: parseDdMmYyyyTHHmmss(dto.access_token_expiration),
      refreshExpiresAt: parseDdMmYyyyTHHmmss(dto.refresh_token_expiration),
      user: {
        id: dto.user.id,
        username: dto.user.username,
        roles: dto.user.roles ?? [],
      },
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
