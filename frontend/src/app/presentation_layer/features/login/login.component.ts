import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppLoginFacade } from 'src/app/application_layer/login/abstractions/app.login.facade';

// Angular Material Module-Imports (Standalone!)
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AppLoginFacade);
  private router = inject(Router);

  showPassword = false;
  error: string | null = null;
  loading = false;

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
      next: () => { this.loading = false; this.router.navigateByUrl('/start'); },
      error: (e) => { this.loading = false; this.error = e?.error?.message ?? 'Login fehlgeschlagen'; }
    });
  }
}
