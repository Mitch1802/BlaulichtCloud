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

  ngOnInit(): void {
    sessionStorage.setItem('PageNumber', '1');
    sessionStorage.setItem('Page1', 'Start');
    sessionStorage.setItem('Page2', '');


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
            sessionStorage.setItem('Konfig', JSON.stringify(erg.konfiguration[0]));
          } else {
            alert('Keine Konfiguration vorhanden!');
          }
          let is_verwaltung = sessionStorage.getItem('Verwaltung');
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
