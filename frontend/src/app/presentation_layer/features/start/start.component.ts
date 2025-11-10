import { Component, OnInit, inject } from '@angular/core';

import { GlobalDataService } from '../../../_service/global-data.service';
import { HeaderComponent } from '../../../_template/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AppStartFacade } from '@app/application_layer/start/abstractions/app.start.facade';
import { Modul } from '@app/application_layer/start/models/modul.models';

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
  private appFacade = inject(AppStartFacade);

  breadcrumb: any = [];
  start_konfig:any = [];
  username = '';   
  error = '';
  meine_rollen = '';             
  meineRollenKeys: string[] = [];       
  visibleItems: any[] = []; 

  ngOnInit(): void {
    sessionStorage.setItem('PageNumber', '1');
    sessionStorage.setItem('Page1', 'Start');
    sessionStorage.setItem('Page2', '');

    this.breadcrumb = this.globalDataService.ladeBreadcrumb();
    this.username = sessionStorage.getItem('Benutzername') || 'Gast';
    // this.meine_rollen = sessionStorage.getItem('Rollen') || '';

    this.appFacade.getStartKonfig().subscribe({
      next: (erg: Modul[]) => { 
        this.visibleItems = erg;
      },
      error: (e: any) => {this.error = e?.error?.message ?? 'Login fehlgeschlagen'; }
    });

    // this.globalDataService.get("modul_konfiguration").subscribe({
    //   next: (erg: any) => {
    //     try {
    //       const konfigs = erg.main.find((m: any) => m.modul === 'start');
    //       this.start_konfig = konfigs?.konfiguration ?? [];

    //       if (this.meine_rollen) {
    //         try {
    //           this.meineRollenKeys = JSON.parse(this.meine_rollen);
    //         } catch {
    //           this.meineRollenKeys = [];
    //         }
    //       }

    //       this.visibleItems = this.start_konfig.filter((item: any) =>
    //         item.rolle
    //           .split(',')
    //           .map((r: string) => r.trim())
    //           .some((rName: any) => this.meineRollenKeys.includes(rName))
    //       );
    //     } catch (e: any) {
    //       this.globalDataService.erstelleMessage("error", e);
    //     }
    //   },
    //   error: (error: any) => {
    //     this.globalDataService.errorAnzeigen(error);
    //   }
    // });
  }
}
