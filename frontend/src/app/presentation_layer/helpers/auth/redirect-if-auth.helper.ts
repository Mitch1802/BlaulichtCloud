import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppLoginFacade } from 'src/app/application_layer/login/abstractions/app.login.facade';
import { map, take } from 'rxjs/operators';

export const redirectIfAuthHelper: CanActivateFn = () => {
  const auth = inject(AppLoginFacade);
  const router = inject(Router);
  return auth.isAuthenticated$.pipe(
    take(1),
    map(isAuth => {
      if (isAuth) { router.navigateByUrl('/start'); return false; }
      return true;
    })
  );
};
