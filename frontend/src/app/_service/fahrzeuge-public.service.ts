import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalDataService } from "./global-data.service";
import { IFahrzeugPublic } from "../_interface/fahrzeug";

@Injectable({ providedIn: "root" })
export class FahrzeugePublicService {
  private http = inject(HttpClient);
  private gds = inject(GlobalDataService);

  verifyPin(publicId: string, pin: string) {
    return this.http.post<{ access_token: string; expires_in: number }>(
      `${this.gds.AppUrl}public/fahrzeuge/${publicId}/pin/verify`,
      { pin }
    );
  }

  getPublicFahrzeug(publicId: string, token: string) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<IFahrzeugPublic>(
      `${this.gds.AppUrl}public/fahrzeuge/${publicId}`,
      { headers }
    );
  }
}
