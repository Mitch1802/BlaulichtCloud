import { Component, OnInit, inject } from '@angular/core';
import { GlobalDataService } from '../_service/global-data.service';
import { HeaderComponent } from '../_template/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.sass'],
    standalone: true,
    imports: [
        HeaderComponent,
        MatCardModule,
        RouterLink
    ],
})
export class StartComponent implements OnInit {
  private globalDataService = inject(GlobalDataService);

  breadcrumb: any = [];


  datenModule: any = [
    {
      bezeichnung: 'Katastrophen',
      kuerzel: 'K',
      icon: 'grid_4x4',
      reihenfolge: 1,
    },
    {
      bezeichnung: 'Gefahren',
      kuerzel: 'G',
      icon: 'warning',
      reihenfolge: 2,
    },
    {
      bezeichnung: 'Massnahmen',
      kuerzel: 'M',
      icon: 'construction',
      reihenfolge: 3,
    },
    {
      bezeichnung: 'Rollen',
      kuerzel: 'R',
      icon: 'distance',
      reihenfolge: 4,
    },
    {
      bezeichnung: 'Kontakte',
      kuerzel: 'C',
      icon: 'people',
      reihenfolge: 5,
    },
    {
      bezeichnung: 'Dokumente',
      kuerzel: 'D',
      icon: 'file',
      reihenfolge: 6,
    },
    {
      bezeichnung: 'Fahrzeuge',
      kuerzel: 'F',
      icon: 'lkw',
      reihenfolge: 7,
    },
    {
      bezeichnung: 'KMaterial',
      kuerzel: 'KM',
      icon: 'construction',
      reihenfolge: 8,
    },
    {
      bezeichnung: 'Verwaltung',
      kuerzel: 'V',
      icon: 'settings',
      reihenfolge: 9,
    },
  ];

  ngOnInit(): void {
    sessionStorage.setItem('KatPlanPageNumber', '1');
    sessionStorage.setItem('KatPlanPage1', 'Start');
    sessionStorage.setItem('KatPlanPage2', '');
    sessionStorage.setItem('KatPlanPage3', '');
    sessionStorage.setItem('KatPlanPage4', '');
    sessionStorage.setItem('KatPlanPage5', '');
    sessionStorage.setItem('KatPlanPage6', '');

    this.breadcrumb = this.globalDataService.ladeBreadcrumb();

    this.globalDataService.get('module').subscribe({
      next: (erg: any) => {
        try {
          if (erg.konfiguration.length > 0) {
            delete erg.konfiguration[0].pkid;
            delete erg.konfiguration[0].id;
            delete erg.konfiguration[0].password;
            delete erg.konfiguration[0].created_at;
            delete erg.konfiguration[0].updated_at;
            sessionStorage.setItem('KatPlanKonfig', JSON.stringify(erg.konfiguration[0]));
          } else {
            alert('Keine Konfiguration vorhanden!');
          }
          erg.module = this.datenModule;
          let is_verwaltung = sessionStorage.getItem('KatPlanVerwaltung');
          let bool_is_verwaltung = is_verwaltung?.toLowerCase() === 'true';
        } catch (e: any) {
          this.globalDataService.erstelleMessage('error', e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      },
    });
  }
}
