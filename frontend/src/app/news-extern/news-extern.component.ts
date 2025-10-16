import { Component, OnInit, inject } from '@angular/core';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
    selector: 'app-news-extern',
    imports: [MatCardModule],
    templateUrl: './news-extern.component.html',
    styleUrl: './news-extern.component.sass'
})
export class NewsExternComponent implements OnInit {
  globalDataService = inject(GlobalDataService);
  router = inject(Router);

  title = "Newsfeed FF Schwadorf";
  modul = "news";

  ngOnInit(): void {
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
