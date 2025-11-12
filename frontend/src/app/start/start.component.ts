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
    imports: [
    HeaderComponent,
    MatCardModule,
    RouterLink,
    MatIconModule
]
})
export class StartComponent implements OnInit {
  private globalDataService = inject(GlobalDataService);

  breadcrumb: any = [];
  start_konfig:any = [];
  username = '';   
  meine_rollen = '';             
  meineRollenKeys: string[] = [];       
  visibleItems: any[] = []; 

  ngOnInit(): void {
    sessionStorage.setItem('PageNumber', '1');
    sessionStorage.setItem('Page1', 'Start');
    sessionStorage.setItem('Page2', '');

    this.breadcrumb = this.globalDataService.ladeBreadcrumb();
    this.username = sessionStorage.getItem('Benutzername') || 'Gast';
    this.meine_rollen = sessionStorage.getItem('Rollen') || '';

    this.globalDataService.get("modul_konfiguration").subscribe({
      next: (erg: any) => {
        try {
          const konfigs = erg.main.find((m: any) => m.modul === 'start');
          this.start_konfig = konfigs?.konfiguration ?? [];

          this.visibleItems = this.start_konfig.filter((item: any) =>
            item.rolle
              .split(',')
              .map((r: string) => r.trim())
              .some((rName: any) => this.meine_rollen.includes(rName))
          );
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }
}
