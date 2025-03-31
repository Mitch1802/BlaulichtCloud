import { Component, OnInit, inject } from '@angular/core';
import { GlobalDataService } from '../_service/global-data.service';
import { HeaderComponent } from '../_template/header/header.component';

import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-verwaltung',
    templateUrl: './verwaltung.component.html',
    styleUrls: ['./verwaltung.component.sass'],
    standalone: true,
    imports: [HeaderComponent, MatCardModule, RouterLink]
})
export class VerwaltungComponent implements OnInit {
  private globalDataService = inject(GlobalDataService);

  breadcrumb: any = [];
  error: string | null = null;
  title: string = "Verwaltung";
  is_verwaltung: boolean = sessionStorage.getItem("KatPlanVerwaltung")!.toLowerCase() == 'true';
  is_staff: boolean = sessionStorage.getItem("KatPlanBenutzerVerwaltung")!.toLowerCase() == 'true';
  module: any[] = []

  ngOnInit(): void { 
    this.is_verwaltung = sessionStorage.getItem("KatPlanVerwaltung")!.toLowerCase() == 'true';
    this.is_staff = sessionStorage.getItem("KatPlanBenutzerVerwaltung")!.toLowerCase() == 'true';
    sessionStorage.setItem("KatPlanPageNumber", "2");
    sessionStorage.setItem("KatPlanPage2", "V");
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();


    this.module.push({"name": "Katastrophen", "link": "katastrophe"});
    this.module.push({"name": "Gefahren", "link": "gefahr"});
    this.module.push({"name": "Maßnahmen", "link": "massnahme"});
    this.module.push({"name": "Rollen", "link": "rolle"});
    this.module.push({"name": "Kontakte", "link": "kontakt"});
    this.module.push({"name": "Dokumente", "link": "dokument"});
    this.module.push({"name": "Fahrzeuge", "link": "fahrzeug"});
    this.module.push({"name": "K-Material", "link": "kmaterial"});
  }

}
