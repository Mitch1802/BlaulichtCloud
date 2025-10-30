import { Component, OnInit, inject } from '@angular/core';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app--atemschutzgeraete',
    imports: [HeaderComponent, MatCardModule],
    templateUrl: './atemschutz-geraete.component.html',
    styleUrl: './atemschutz-geraete.component.sass'
})
export class AtemschutzGeraeteComponent implements OnInit {
  globalDataService = inject(GlobalDataService);

  title = "Geräte";
  modul = "atemschutz/geraete";

  breadcrumb: any = [];

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "3");
    sessionStorage.setItem("Page3", "ATM_G");
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
