import { Component } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        SpinnerComponent,
        RouterOutlet
    ],
    styleUrls: [
        './app.component.sass',
        '../assets/css/material-design-icons.css',
        '../assets/css/material-design-icons-outlined.css',
        '../assets/css/bootstrap-grid.css'
    ]
})
export class AppComponent {
    title = '';
    constructor() {}
}
