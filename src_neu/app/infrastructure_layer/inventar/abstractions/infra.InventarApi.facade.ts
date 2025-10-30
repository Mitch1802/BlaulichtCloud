import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { InventarDto } from '../models/inventar.dto';


@Injectable()
export abstract class InventarApiFacade {
    
    abstract fetchGetAllInventar(): Observable<InventarDto[] | undefined>;
    
    abstract fetchGetOneInventar(inventarId: string): Observable<InventarDto[] | undefined>;
    
    abstract fetchUpdateInventar(inventarId: string, request: any): Observable<InventarDto[] | undefined>;
    
    abstract fetchDeleteInventar(inventarId: string): Observable<InventarDto[] | undefined>;
}