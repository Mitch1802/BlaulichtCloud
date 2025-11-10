import { HttpInterceptorFn, HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { SnackbarService } from 'src/app/presentation_layer/common/services/snackbar.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const SKIP = ['/auth/login']; // ggf. erweitern

export const errorSnackbarInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const snack = inject(SnackbarService);
  const shouldSkip = SKIP.some(x => req.url.includes(x));

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (!shouldSkip) {
        const msg = err.error?.message || err.statusText || 'Unbekannter Fehler';
        snack.error(`Fehler ${err.status}: ${msg}`);
      }
      return throwError(() => err);
    })
  );
};
