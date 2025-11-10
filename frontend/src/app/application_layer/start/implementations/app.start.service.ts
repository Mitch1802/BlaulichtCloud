import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { AppStartFacade } from '../abstractions/app.start.facade';
import { Modul } from '../models/modul.models';
import { ModulKonfiguration } from '@app/infrastructure_layer/start/models/modul-konfiguration.dto';
import { InfraStartFacade } from '@app/infrastructure_layer/start/abstractions/infra.start.facade';


@Injectable({ providedIn: 'root' })
export class AppStartService extends AppStartFacade {
  private infra = inject(InfraStartFacade);

  private readonly _verfuegbareModule$ = new BehaviorSubject<any | null>(null);
  verfuegbareModule$ = this._verfuegbareModule$.asObservable();

  getStartKonfig(): Observable<any > {
    return this.infra.getStartKonfig().pipe(
        map(dto => this.mapToVerfuegbareModule(dto)),
        tap(verfuegbareModule => {
            this._verfuegbareModule$.next(verfuegbareModule);
        })
    );
  }

  private mapToVerfuegbareModule(konfig: ModulKonfiguration): any {
    const meine_rollen = sessionStorage.getItem('Rollen') || '';
    const meineRollenKeys = JSON.parse(meine_rollen);
    const konfigs = konfig.main.find((m: any) => m.modul === 'start');
    const start_konfig = konfigs?.konfiguration ?? [];
    const visibleItems = start_konfig.filter((item: Modul) =>
            item.rolle
              .split(',')
              .map((r: string) => r.trim())
              .some((rName: any) => meineRollenKeys.includes(rName))
          );
    return visibleItems;
  }
}
