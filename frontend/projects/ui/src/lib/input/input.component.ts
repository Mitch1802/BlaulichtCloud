import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormControl, AbstractControl, ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'imr-input',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.sass',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class ImrInput {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input({ required: true }) controlName!: string;
}
