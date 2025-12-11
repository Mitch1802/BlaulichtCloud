import { Component, EventEmitter, input, Output } from '@angular/core';

import { MatButton } from '@angular/material/button';

@Component({
  selector: 'imr-button',
  imports: [MatButton],
  templateUrl: './button.component.html',
  styleUrl: './button.component.sass'
})
export class ImrButton {
  color = input<'primary' | 'accent' | 'warn' | undefined>('primary');
  variant = input<'filled' | 'outlined' | 'text'>('filled');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);

  @Output() clicked = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    if (this.disabled()) return;
    this.clicked.emit(event);
  }
}
