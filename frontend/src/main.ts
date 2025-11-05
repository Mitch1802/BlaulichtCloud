import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot, withRouterConfig } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { APP_INITIALIZER } from '@angular/core';
import { routes } from './app/app.routes';

import { AppComponent } from './app/app.component';

// Abstraktionen
import { InfraLoginFacade } from '@app/infrastructure_layer/login/abstractions/infra.login.facade';
import { AppLoginFacade } from '@app/application_layer/login/abstractions/app.login.facade';

// Implementierungen
import { InfraLoginService } from '@app/infrastructure_layer/login/implementations/infra.login.service';
import { AppLoginService } from '@app/application_layer/login/implementations/app.login.service';

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

    // DI: Abstraktionen mit Implementierungen verbinden
    { provide: InfraLoginFacade, useClass: InfraLoginService },
    { provide: AppLoginFacade,   useClass: AppLoginService },


    { provide: APP_INITIALIZER, useFactory: authInitFactory, deps: [AppLoginFacade], multi: true },
  ]
});