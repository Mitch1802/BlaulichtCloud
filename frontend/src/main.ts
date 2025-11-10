import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot, withRouterConfig } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { APP_INITIALIZER } from '@angular/core';
import { routes } from './app/app.routes';

import { AppComponent } from './app/app.component';

import { authTokenInterceptor } from '@app/infrastructure_layer/http/auth-token.interceptor';
import { AccessTokenProvider } from '@app/infrastructure_layer/common/abstractions/access-token.provider';
import { AccessTokenProviderAdapter } from '@app/application_layer/login/implementations/access-token.provider.adapter';


// Abstraktionen
import { InfraLoginFacade } from '@app/infrastructure_layer/login/abstractions/infra.login.facade';
import { InfraStartFacade } from '@app/infrastructure_layer/start/abstractions/infra.start.facade';
import { AppLoginFacade } from '@app/application_layer/login/abstractions/app.login.facade';
import { AppStartFacade } from '@app/application_layer/start/abstractions/app.start.facade';

// Implementierungen
import { InfraLoginService } from '@app/infrastructure_layer/login/implementations/infra.login.service';
import { InfraStartService } from '@app/infrastructure_layer/start/implementations/infra.start.service';
import { AppLoginService } from '@app/application_layer/login/implementations/app.login.service';
import { AppStartService } from '@app/application_layer/start/implementations/app.start.service';

class NoReuseStrategy implements RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean { return false; }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {}
  shouldAttach(route: ActivatedRouteSnapshot): boolean { return false; }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null { return null; }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean { return false; }
}

function authInitFactory(appLogin: AppLoginFacade) {
  return () => { appLogin.hydrateFromSession(); };
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    provideAnimations(),
    provideCharts(withDefaultRegisterables()),
    { provide: RouteReuseStrategy, useClass: NoReuseStrategy },

    provideHttpClient(withInterceptors([authTokenInterceptor])),
    { provide: AccessTokenProvider, useClass: AccessTokenProviderAdapter },
    { provide: InfraLoginFacade, useClass: InfraLoginService },
    { provide: InfraStartFacade, useClass: InfraStartService },
    { provide: AppLoginFacade,   useClass: AppLoginService },
    { provide: AppStartFacade,   useClass: AppStartService },


    { provide: APP_INITIALIZER, useFactory: authInitFactory, deps: [AppLoginFacade], multi: true },
  ]
});