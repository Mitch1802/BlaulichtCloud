import { ApplicationConfig, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// === Deine Abstraktionen/Implementierungen verdrahten ===
import { InfraLoginFacade } from './infrastructure_layer/login/abstractions/infra.login.facade';
import { InfraLoginService } from './infrastructure_layer/login/implementations/infra.login.service';
import { InfraStartFacade } from './infrastructure_layer/start/abstractions/infra.start.facade';
import { InfraStartService } from './infrastructure_layer/start/implementations/infra.start.service';
import { AppLoginFacade } from './application_layer/login/abstractions/app.login.facade';
import { AppLoginService } from './application_layer/login/implementations/app.login.service';
import { AppStartFacade } from './application_layer/start/abstractions/app.start.facade';
import { AppStartService } from './application_layer/start/implementations/app.start.service';

// (falls du den Token-Provider + Interceptor nutzt)
import { AccessTokenProvider } from './infrastructure_layer/common/abstractions/access-token.provider';
import { AccessTokenProviderAdapter } from './application_layer/login/implementations/access-token.provider.adapter';
import { authTokenInterceptor } from './infrastructure_layer/http/auth-token.interceptor';
// (optional) globaler Error-Snackbar-Interceptor
import { errorSnackbarInterceptor } from './infrastructure_layer/http/error-snackbar.interceptor';

// Hydration-Funktion (Session laden VOR dem ersten Routing)
function authInitFactory() {
  const auth = inject(AppLoginFacade);
  return () => auth.hydrateFromSession(); // synchron, Promise nicht nötig
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        authTokenInterceptor,
        errorSnackbarInterceptor,
      ])
    ),

    provideAnimations(),

    // DI-Mapping der Abstraktionen
    { provide: InfraLoginFacade, useClass: InfraLoginService },
    { provide: InfraStartFacade, useClass: InfraStartService },
    { provide: AppLoginFacade,   useClass: AppLoginService },
    { provide: AppStartFacade,   useClass: AppStartService },
    { provide: AccessTokenProvider, useClass: AccessTokenProviderAdapter },

    // Initializer sauber über ApplicationConfig
    { provide: APP_INITIALIZER, useFactory: authInitFactory, multi: true },
  ],
};
