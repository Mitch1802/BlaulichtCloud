import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

type Variant = 'success' | 'error' | 'info' | 'warning';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private snack = inject(MatSnackBar);

  show(message: string, variant: Variant = 'info', cfg: MatSnackBarConfig = {}) {
    const panelClass = this.variantClass(variant);
    return this.snack.open(message, 'OK', {
      duration: 3500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass,
      ...cfg,
    });
  }

  success(msg: string, cfg: MatSnackBarConfig = {}) { return this.show(msg, 'success', cfg); }
  error(msg: string, cfg: MatSnackBarConfig = {})   { return this.show(msg, 'error', cfg); }
  info(msg: string, cfg: MatSnackBarConfig = {})    { return this.show(msg, 'info', cfg); }
  warning(msg: string, cfg: MatSnackBarConfig = {}) { return this.show(msg, 'warning', cfg); }

  /** Bestätigungs-Snackbar mit Aktion; gibt true zurück, wenn geklickt */
  confirm(message: string, action = 'OK', variant: Variant = 'info', cfg: MatSnackBarConfig = {}): Promise<boolean> {
    return new Promise(res => {
      this.snack.open(message, action, {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: this.variantClass(variant),
        ...cfg,
      }).onAction().subscribe(() => res(true));
      // Wenn du auch Auto-Close auswerten willst:
      // .afterDismissed().subscribe(() => res(false));
    });
  }

  private variantClass(v: Variant): string[] {
    return [`snackbar-${v}`];
  }
}
