import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebServiceWorkerService implements OnDestroy {
  serviceSubscriptions: Subscription[] = [];

  cacheMediaFiles(fileUrls: string[]): Observable<number> {
    return new Observable<number>((observer) => {
      if ('caches' in window) {
        caches.open('media-files').then((cache) => {
          const totalFiles = fileUrls.length;
          let cachedFiles = 0;

          fileUrls.forEach((url) => {
            fetch(url)
              .then((response) => cache.put(url, response))
              .then(() => {
                cachedFiles++;
                const progress = Math.round((cachedFiles / totalFiles) * 100);
                observer.next(progress); // Fortschritt melden
                if (cachedFiles === totalFiles) {
                  observer.complete(); // Caching abgeschlossen
                }
              })
              .catch((error) => {
                console.error(`Error caching file ${url}:`, error);
                observer.error(error);
              });
          });
        });
      } else {
        observer.error('Cache API not supported.');
      }
    });
  }

  ngOnDestroy(): void {
    this.serviceSubscriptions?.forEach((x) => x?.unsubscribe());
  }
}
