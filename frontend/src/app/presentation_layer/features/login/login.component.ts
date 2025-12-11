import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { AppLoginFacade } from 'src/app/application_layer/login/abstractions/app.login.facade';
import { SnackbarService } from '@app/presentation_layer/common/services/snackbar.service';

// Angular Material Module-Imports (Standalone!)
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ImrButton, ImrInput, ImrInputPassword } from 'projects/ui/src/public-api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatCardModule,  
    ImrButton,
    ImrInput,
    ImrInputPassword
  ]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AppLoginFacade);
  private router = inject(Router);
  private snack = inject(SnackbarService);

  showPassword = false;
  error: string | null = null;
  loading = false;
  footer = this.auth.getFooter();

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  togglePasswordVisibility() { this.showPassword = !this.showPassword; }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;
    const { username, password } = this.form.value as { username: string; password: string };
    this.auth.login({ username, password }).subscribe({
      next: () => {
        this.loading = false;
        this.snack.success('Erfolgreich angemeldet.');
        this.router.navigateByUrl('/start');
      },
      error: (e) => {
        this.loading = false;
        const msg = e?.error?.non_field_errors ?? 'Login fehlgeschlagen.';
        this.snack.error(msg);
      }
    });
  }
}
