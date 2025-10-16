import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { GlobalDataService } from 'src/app/_service/global-data.service';

type NewsItem = {
  bild?: string;
  title: string;
  text: string;
};

@Component({
  selector: 'app-news-extern',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './news-extern.component.html',
  styleUrls: ['./news-extern.component.sass']
})
export class NewsExternComponent implements OnInit, OnDestroy {
  globalDataService = inject(GlobalDataService);
  router = inject(Router);

  title = 'Neuigkeiten FF Schwadorf';
  modul = 'news';
  dauer_artikel_in_sek: number = 10;



  daten: NewsItem[] = [
    {
      bild: '',
      title: 'Neue Webseite',
      text: 'Wir haben ab sofort einen neue Webseite für interne News! \n\nhttps://blaulichtcloud.at/newsfeed'
    },
    {
      bild: 'assets/test/bild1.jpg', 
      title: 'Abschluss Grundlagen Führen',
      text: 'Unser Dario Richter hat kürzlich das Modul Grundlagen Führen erfolgreich absolviert! Gratulation'
    },
    {
      bild: 'assets/test/bild2.jpg',
      title: 'Feuerlöscher Überprüfung',
      text: 'Am kommenden Freitag, den 10.10., laden wir in Zusammenarbeit mit der Fa. Minimax zur Feuerlöscher Überprüfung ein. Kommen Sie gerne vorbei und lassen Sie Ihre Feuerlöscher überprüfen!'
    },
    {
      bild: 'assets/test/bild3.jpg',
      title: 'Save the Date, Save a Life!',
      text: 'Am 17. Oktober steht die nächste Blutspendeaktion Schwadorf bevor – es besteht wieder die Möglichkeit, Gutes zu tun und Blut zu spenden.'
    }
  ];

  currentIndex = 0;
  currentItem: NewsItem | null = this.daten[0]; 
  private intervalSub?: Subscription;
  termine: any = [];

  ngOnInit(): void {
    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
          this.daten = erg.main;
          this.currentItem = this.daten[this.currentIndex];
          let dauer = this.dauer_artikel_in_sek * 1000;
          this.intervalSub = interval(dauer).subscribe(() => {
            this.currentIndex = (this.currentIndex + 1) % this.daten.length;
            this.currentItem = this.daten[this.currentIndex];
          });
          this.globalDataService.getURL('https://ff-schwadorf.at/v2025/server/kalender/index.php').subscribe({
            next: (erg: any) => {
              try {
                this.termine = erg;
              } catch (e: any) {
                this.globalDataService.erstelleMessage("error", e);
              }
            },
            error: (error: any) => {
              this.globalDataService.errorAnzeigen(error);
            }
          });
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.intervalSub?.unsubscribe();
  }

  

}
