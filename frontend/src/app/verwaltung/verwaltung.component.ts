import { Component, OnInit, inject } from '@angular/core';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { HeaderComponent } from '../_template/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
    selector: 'app-verwaltung',
    imports: [HeaderComponent, MatCardModule],
    templateUrl: './verwaltung.component.html',
    styleUrl: './verwaltung.component.sass'
})
export class VerwaltungComponent implements OnInit {
  globalDataService = inject(GlobalDataService);
  router = inject(Router);

  title = "Verwaltung";
  modul = "verwaltung";

  breadcrumb: any = [];

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "2");
    sessionStorage.setItem("Page2", "VER");
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();

    // this.globalDataService.get(this.modul).subscribe({
    //   next: (erg: any) => {
    //     try {
          
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
