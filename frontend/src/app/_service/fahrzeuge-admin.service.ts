import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface IFahrzeugList {
  id: string;
  name: string;
  bezeichnung: string;
  public_id: string;
}

export interface IRaumItem {
  id: string;
  name: string;
  menge: number;
  einheit: string;
  notiz: string;
  reihenfolge: number;
}

export interface IFahrzeugRaum {
  id: string;
  name: string;
  reihenfolge: number;
  items: IRaumItem[];
}

export interface IFahrzeugDetail {
  id: string;
  name: string;
  bezeichnung: string;
  beschreibung: string;
  public_id: string;
  raeume: IFahrzeugRaum[];
}

@Injectable({ providedIn: "root" })
export class FahrzeugeAdminService {
  private http = inject(HttpClient);

  // base wird bei dir vermutlich im Interceptor/GlobalDataService als /api/v1/ gesetzt.
  // Wenn nicht: hier baseUrl ergänzen.
  list(): Observable<IFahrzeugList[]> {
    return this.http.get<IFahrzeugList[]>("fahrzeuge/");
  }

  create(data: { name: string; bezeichnung?: string; beschreibung?: string }): Observable<any> {
    return this.http.post("fahrzeuge/", data);
  }

  detail(id: string): Observable<IFahrzeugDetail> {
    return this.http.get<IFahrzeugDetail>(`fahrzeuge/${id}/`);
  }

  patch(id: string, data: Partial<{ name: string; bezeichnung: string; beschreibung: string }>): Observable<any> {
    return this.http.patch(`fahrzeuge/${id}/`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`fahrzeuge/${id}/`);
  }

  // Räume
  createRaum(fahrzeugId: string, data: { name: string; reihenfolge?: number }): Observable<any> {
    return this.http.post(`fahrzeuge/${fahrzeugId}/raeume/`, data);
  }

  patchRaum(fahrzeugId: string, raumId: string, data: Partial<{ name: string; reihenfolge: number }>): Observable<any> {
    return this.http.patch(`fahrzeuge/${fahrzeugId}/raeume/${raumId}/`, data);
  }

  deleteRaum(fahrzeugId: string, raumId: string): Observable<any> {
    return this.http.delete(`fahrzeuge/${fahrzeugId}/raeume/${raumId}/`);
  }

  // Items
  createItem(raumId: string, data: { name: string; menge?: number; einheit?: string; notiz?: string; reihenfolge?: number }): Observable<any> {
    return this.http.post(`raeume/${raumId}/items/`, data);
  }

  patchItem(raumId: string, itemId: string, data: Partial<{ name: string; menge: number; einheit: string; notiz: string; reihenfolge: number }>): Observable<any> {
    return this.http.patch(`raeume/${raumId}/items/${itemId}/`, data);
  }

  deleteItem(raumId: string, itemId: string): Observable<any> {
    return this.http.delete(`raeume/${raumId}/items/${itemId}/`);
  }

  // PIN Admin
  setPin(fahrzeugId: string, pin: string): Observable<any> {
    return this.http.post(`fahrzeuge/${fahrzeugId}/pin/`, { pin });
  }

  disablePin(fahrzeugId: string): Observable<any> {
    return this.http.post(`fahrzeuge/${fahrzeugId}/pin/disable/`, {});
  }

  rotatePin(fahrzeugId: string): Observable<{ detail: string; pin: string }> {
    return this.http.post<{ detail: string; pin: string }>(`fahrzeuge/${fahrzeugId}/pin/rotate/`, {});
  }
}
