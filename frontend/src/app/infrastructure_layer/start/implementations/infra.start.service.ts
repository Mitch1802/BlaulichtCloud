import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModulKonfiguration } from '../models/modul-konfiguration.dto';
import { environment } from 'src/environments/environment';
import { InfraStartFacade } from '../abstractions/infra.start.facade';

@Injectable({ providedIn: 'root' })
export class InfraStartService extends InfraStartFacade {
    private http = inject(HttpClient);

    getStartKonfig(): Observable<ModulKonfiguration> {
        return this.http.get<ModulKonfiguration>(`${environment.apiUrl}${environment.modulKonfiguartionUrl}`);
    }
}