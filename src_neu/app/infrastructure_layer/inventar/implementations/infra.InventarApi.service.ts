import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { InventarApiFacade } from '../abstractions/infra.InventarApi.facade';
import { InventarDto } from '../models/inventar.dto';
import { environment } from '../../../../environments/environment';


@Injectable({
    providedIn: 'root',
})
export class InfraInventarApiService extends InventarApiFacade {
    private http = inject(HttpClient);

    override fetchGetAllInventar(): Observable<InventarDto[] | undefined> {
        return this.http
            .get(
                `${environment.apiUrl}${environment.inventarUrl}`
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
                `${environment.apiUrl}${environment.inventarUrl}${inventarId}`
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