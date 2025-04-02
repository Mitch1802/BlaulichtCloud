import { Component, OnInit, inject } from '@angular/core';
import { GlobalDataService } from '../_service/global-data.service';
import { HeaderComponent } from '../_template/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.sass'],
    standalone: true,
    imports: [
        HeaderComponent,
        MatCardModule,
        RouterLink,
        MatIconModule
    ],
})
export class StartComponent implements OnInit {
  private globalDataService = inject(GlobalDataService);

  breadcrumb: any = [];

  ngOnInit(): void {
    sessionStorage.setItem('PageNumber', '1');
    sessionStorage.setItem('Page1', 'Start');
    sessionStorage.setItem('Page2', '');


    this.breadcrumb = this.globalDataService.ladeBreadcrumb();
  }
}
