import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';


import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from '../../../_template/header/header.component';
import { AppStartFacade } from '@app/application_layer/start/abstractions/app.start.facade';
import { Modul } from '@app/application_layer/start/models/modul.models';
import { AppLoginFacade } from '@app/application_layer/login/abstractions/app.login.facade';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.sass'],
    imports: [
    HeaderComponent,
    MatCardModule,
    RouterLink,
    MatIconModule,
    CommonModule
]
})
export class StartComponent implements OnInit {
  private appFacade = inject(AppStartFacade);
  private appLoginFacade = inject(AppLoginFacade);

  breadcrumb: any = [];
  start_konfig:any = [];
  username = '';   
  error = '';
  meine_rollen = '';             
  meineRollenKeys: string[] = [];       
  visibleItems: any[] = []; 

  username$ = this.appLoginFacade.tokens$.pipe(
    map(t => t?.user?.username ?? 'Gast')
  );

  ngOnInit(): void {  
    this.appFacade.getStartKonfig().subscribe({
      next: (erg: Modul[]) => { 
        this.visibleItems = erg;
      },
      error: (e: any) => {this.error = e?.error?.message ?? 'Login fehlgeschlagen'; }
    });
  }
}
