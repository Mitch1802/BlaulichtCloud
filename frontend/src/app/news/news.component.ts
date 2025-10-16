import { Component, OnInit, inject } from '@angular/core';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { HeaderComponent } from '../_template/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
    selector: 'app-news',
    imports: [HeaderComponent, MatCardModule],
    templateUrl: './news.component.html',
    styleUrl: './news.component.sass'
})
export class NewsComponent implements OnInit {
  globalDataService = inject(GlobalDataService);
  router = inject(Router);

  title = "Newsfeed";
  modul = "news";

  breadcrumb: any = [];

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "2");
    sessionStorage.setItem("Page2", "NEWS");
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();

    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
          console.log(erg);
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
