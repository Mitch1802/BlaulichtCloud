import { Component, OnInit, inject } from '@angular/core';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-atemschutz-messgeraete',
    imports: [HeaderComponent, MatCardModule],
    templateUrl: './atemschutz-messgeraete.component.html',
    styleUrl: './atemschutz-messgeraete.component.sass'
})
export class AtemschutzMessgeraeteComponent implements OnInit {
  globalDataService = inject(GlobalDataService);

  title = "Messgeräte";
  modul = "atemschutz/messgeraete";

  breadcrumb: any = [];

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "3");
    sessionStorage.setItem("Page3", "ATM_MG");
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
