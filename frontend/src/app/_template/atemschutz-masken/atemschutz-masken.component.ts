import { Component, OnInit, inject } from '@angular/core';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-atemschutz-masken',
    imports: [HeaderComponent, MatCardModule],
    templateUrl: './atemschutz-masken.component.html',
    styleUrl: './atemschutz-masken.component.sass'
})
export class AtemschutzMaskenComponent implements OnInit {
  globalDataService = inject(GlobalDataService);

  title = "Masken";
  modul = "atemschutz/masken";

  breadcrumb: any = [];

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "3");
    sessionStorage.setItem("Page3", "ATM_M");
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
