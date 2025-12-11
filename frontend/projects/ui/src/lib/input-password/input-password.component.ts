import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImrInput } from '../input/input.component';

@Component({
  selector: 'imr-input-password',
  standalone: true,
  imports: [
    CommonModule,
    ImrInput,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.sass',
})
export class ImrInputPassword {
  @Input() label = 'Passwort';
  @Input({ required: true }) controlName!: string;

  hide = true;

  toggle(): void {
    this.hide = !this.hide;
  }
}
