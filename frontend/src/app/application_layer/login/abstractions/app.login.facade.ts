import { Observable } from 'rxjs';
import { LoginCredentials, Tokens } from '../models/login.models';

export abstract class AppLoginFacade {
  abstract readonly tokens$: Observable<Tokens | null>;
  abstract readonly isAuthenticated$: Observable<boolean>;

  abstract hydrateFromSession(): void;
  abstract login(credentials: LoginCredentials): Observable<Tokens>;
  abstract hardLogout(): void;

  abstract getAccessTokenSync(): string | null;

  abstract getFooter(): string | null;
}
