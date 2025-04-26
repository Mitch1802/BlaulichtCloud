import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
      CommonModule,
      HeaderComponent,
      MatCardModule,
      RouterLink,
      MatIconModule
    ],
})
export class StartComponent implements OnInit {
  private globalDataService = inject(GlobalDataService);

  breadcrumb: any = [];
  // start_konfig:any = {};
  username: string = '';   
  meine_rollen: string = '';             
  meineRollenKeys: string[] = [];       
  visibleItems: any[] = []; 

  start_konfig:any = {
    "modul": "Start", 
    "data": [
      {"modul": "FMD", "rolle": "ADMIN, FMD", "routerlink":"/fmd", "icon":"healing"},
      {"modul": "Mitglieder", "rolle": "ADMIN", "routerlink":"/mitglied", "icon":"groups"},
      {"modul": "Modul Konfiguration", "rolle": "ADMIN", "routerlink":"/modul_konfiguration", "icon":"tune"},
      {"modul": "Benutzerverwaltung", "rolle": "ADMIN", "routerlink":"/benutzer", "icon":"account_circle"},
      {"modul": "Konfiguration", "rolle": "ADMIN", "routerlink":"/konfiguration", "icon":"settings"}
    ]
  };

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
          if (this.meine_rollen) {
            try {
              this.meineRollenKeys = JSON.parse(this.meine_rollen);
            } catch {
              this.meineRollenKeys = [];
            }
          }

          if (!this.meineRollenKeys.length) {
            const rollenArray: { id: number; key: string }[] = erg.data.rollen;
            const meineRollenIds: number[] = this.meine_rollen
              .split(',')
              .map((s: any) => parseInt(s.trim(), 10))
              .filter((n: any) => !isNaN(n));

            this.meineRollenKeys = rollenArray
              .filter(r => meineRollenIds.includes(r.id))
              .map(r => r.key);

            sessionStorage.setItem('Rollen', JSON.stringify(this.meineRollenKeys));
          }

          this.visibleItems = this.start_konfig.data.filter((item: any) =>
            item.rolle
              .split(',')
              .map((r: string) => r.trim())
              .some((rName: any) => this.meineRollenKeys.includes(rName))
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
