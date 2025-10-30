import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [ MatButtonModule ],
  template: './ui-button.component.html',
  styleUrls: ['./ui-button.component.sass']
})
export class UiButtonComponent {
  @Input() color: 'primary' | 'accent' | 'warn' | undefined = 'primary';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() icon?: string;
  @Input() onClick?: () => void;
}
