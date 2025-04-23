import { Component, OnInit, inject } from '@angular/core';
import { IMitglied } from 'src/app/_interface/mitglied';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { HeaderComponent } from '../_template/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mitglied',
  standalone: true,
  imports: [HeaderComponent, MatCardModule ],
  templateUrl: './mitglied.component.html',
  styleUrl: './mitglied.component.sass'
})
export class MitgliedComponent implements OnInit {
  globalDataService = inject(GlobalDataService);
  router = inject(Router);

  title: string = "Mitglieder Verwaltung";
  modul: string = "mitglieder";

  mitglieder: IMitglied[] = [];
  breadcrumb: any = [];

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "2");
    sessionStorage.setItem("Page2", "V_M");
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();

    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
          this.mitglieder = erg.data.main;
          this.mitglieder = this.globalDataService.arraySortByKey(this.mitglieder, 'stbnr');
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
