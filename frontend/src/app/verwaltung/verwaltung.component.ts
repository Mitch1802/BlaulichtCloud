import { Component, inject, OnInit } from '@angular/core';
import { GlobalDataService } from '../_service/global-data.service';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../_template/header/header.component';

@Component({
  selector: 'app-verwaltung',
  imports: [
    HeaderComponent,
    MatCardModule
  ],
  templateUrl: './verwaltung.component.html',
  styleUrl: './verwaltung.component.sass'
})
export class VerwaltungComponent implements OnInit {
  globalDataService = inject(GlobalDataService);

  title = 'Verwaltung';
  modul = 'verwaltung';

  breadcrumb: any = [];

  ngOnInit(): void {
    sessionStorage.setItem('PageNumber', '2');
    sessionStorage.setItem('Page2', 'VER');
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();
  }

}