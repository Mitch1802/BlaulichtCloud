import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { interval, Subscription, timer } from 'rxjs';
import { GlobalDataService } from 'src/app/_service/global-data.service';

type NewsItem = {
  foto_url?: string;
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
  modul = 'news/public';

  // Anzeige-Einstellungen
  dauer_artikel_in_sek = 10;      // Rotationsdauer
  refresh_in_min = 1;             // wie oft Daten neu laden

  daten: NewsItem[] = [];
  currentIndex = 0;
  currentItem: NewsItem | null = null;

  private rotateSub?: Subscription;
  private refreshSub?: Subscription;

  termine: any = [];

  ngOnInit(): void {
    // 1) initial laden
    this.loadData();

    // 2) Rotations-Timer starten
    this.startRotateTimer();

    // 3) Refresh-Timer: sofort feuern (0) und dann alle X Minuten erneut laden
    this.refreshSub = timer(this.refresh_in_min * 60_000, this.refresh_in_min * 60_000).subscribe({
      next: () => this.loadData(),
      error: (e) => this.globalDataService.errorAnzeigen(e)
    });
  }

  ngOnDestroy(): void {
    this.rotateSub?.unsubscribe();
    this.refreshSub?.unsubscribe();
  }

  // -------------------------------------
  // Helpers
  // -------------------------------------
  private startRotateTimer(): void {
    // erst stoppen, falls schon einer läuft
    this.rotateSub?.unsubscribe();

    const dauer = Math.max(1, this.dauer_artikel_in_sek) * 1000;
    this.rotateSub = interval(dauer).subscribe(() => {
      if (this.daten.length > 0) {
        this.currentIndex = (this.currentIndex + 1) % this.daten.length;
        this.currentItem = this.daten[this.currentIndex];
      }
    });
  }

  private loadData(): void {
    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
          const oldLen = this.daten.length;

          this.daten = Array.isArray(erg) ? erg : [];
          // Index gültig halten
          if (this.daten.length === 0) {
            this.currentIndex = 0;
            this.currentItem = null;
          } else {
            if (oldLen === 0) {
              // erstes Laden: bei 0 beginnen
              this.currentIndex = 0;
            } else {
              // nach Refresh: Index modulo neue Länge
              this.currentIndex = this.currentIndex % this.daten.length;
            }
            this.currentItem = this.daten[this.currentIndex];
          }

          // (optional) Rotations-Timer neu starten, falls Dauer geändert/erste Daten
          if (!this.rotateSub || oldLen === 0) {
            this.startRotateTimer();
          }

          // externen Kalender laden (unverändert)
          this.globalDataService.getURL('https://ff-schwadorf.at/v2025/server/kalender/index.php').subscribe({
            next: (k: any) => { this.termine = k; },
            error: (err: any) => this.globalDataService.errorAnzeigen(err)
          });

        } catch (e: any) {
          this.globalDataService.erstelleMessage('error', e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }
}
