import { Observable } from 'rxjs';
import { environment } from './../../../../../frontend/src/environments/environment'; // TODO PFAD ÄNDERN
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { InventarApiFacade } from '../abstractions/infra.InventarApi.facade';
import { InventarDto } from '../models/inventar.dto';


@Injectable({
    providedIn: 'root',
})
export class InfraInventarApiService extends InventarApiFacade {
    private http = inject(HttpClient);

    override fetchGetAllInventar(): Observable<InventarDto[] | undefined> {
        return this.http
            .get(
                `${environment.apiUrl}${environment.inventar}`
            )
            .pipe(
                map(response => {
                    return response;
                })
            );
    }
    
    override fetchGetOneInventar(inventarId: string): Observable<InventarDto[] | undefined> {
        return this.http
            .get(
                `${environment.apiUrl}${environment.inventar}${inventarId}`
            )
            .pipe(
                map(response => {
                    return response;
                })
            );
    }
    
    override fetchUpdateInventar(inventarId: string, request: any): Observable<InventarDto[] | undefined> {
        return this.http
            .patch(
                `${environment.apiUrl}${environment.inventar}${inventarId}`, request.toBlob()
            )
            .pipe(
                map(response => {
                    return response;
                })
            );
    }
    
    override fetchDeleteInventar(inventarId: string): Observable<InventarDto[] | undefined> {
        return this.http
            .delete(
                `${environment.apiUrl}${environment.inventar}${inventarId}`
            )
            .pipe(
                map(response => {
                    return response;
                })
            );
    }
}