import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

import { HeaderComponent } from "../_template/header/header.component";
import { GlobalDataService } from "../_service/global-data.service";
import { FahrzeugePublicService } from "../_service/fahrzeuge-public.service";
import { IFahrzeugAuth, IFahrzeugPublic, ICheckDraftItem, CheckStatus } from "../_interface/fahrzeug";

@Component({
  standalone: true,
  selector: "app-fahrzeug-check",
  imports: [
    CommonModule,
    HeaderComponent,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: "./fahrzeug-check.component.html",
})
export class FahrzeugCheckComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gds = inject(GlobalDataService);
  private publicApi = inject(FahrzeugePublicService);

  breadcrumb: any[] = [];

  isPublic = false;
  publicId: string | null = null;
  fahrzeugId: number | null = null;

  fahrzeugPublic: IFahrzeugPublic | null = null;
  fahrzeugAuth: IFahrzeugAuth | null = null;

  draft: Record<string, ICheckDraftItem> = {};

  ngOnInit(): void {
    this.breadcrumb = this.gds.ladeBreadcrumb();

    this.publicId = this.route.snapshot.paramMap.get("publicId");
    this.isPublic = !!this.publicId;

    if (this.isPublic) {
      const token = sessionStorage.getItem(`public_token_${this.publicId}`);
      if (!token) {
        this.router.navigate(["/public/fahrzeuge", this.publicId]);
        return;
      }
      this.publicApi.getPublicFahrzeug(this.publicId!, token).subscribe({
        next: (res) => (this.fahrzeugPublic = res),
        error: (err: any) => this.gds.errorAnzeigen(err),
      });
      return;
    }

    this.fahrzeugId = Number(this.route.snapshot.paramMap.get("id"));
    this.gds.get(`fahrzeuge/${this.fahrzeugId}`).subscribe({
      next: (res: any) => (this.fahrzeugAuth = res as IFahrzeugAuth),
      error: (err: any) => this.gds.errorAnzeigen(err),
    });
  }

  keyFor(raum: any, item: any): string {
    if (!this.isPublic) return String(item.id);
    return `${(raum.name ?? '').trim()}::${item.reihenfolge ?? 0}::${(item.name ?? '').trim()}`.toLowerCase();
  }

  ensureDraft(key: string): void {
    if (!this.draft[key]) this.draft[key] = { status: "ok" };
  }

  setStatus(raum: any, item: any, status: CheckStatus): void {
    const k = this.keyFor(raum, item);
    this.ensureDraft(k);
    this.draft[k].status = status;
  }

  setIst(raum: any, item: any, value: any): void {
    const k = this.keyFor(raum, item);
    this.ensureDraft(k);
    const num = value === "" || value === null || value === undefined ? null : Number(value);
    this.draft[k].menge_aktuel = Number.isFinite(num as number) ? (num as number) : null;
  }

  setNotiz(raum: any, item: any, value: any): void {
    const k = this.keyFor(raum, item);
    this.ensureDraft(k);
    this.draft[k].notiz = String(value ?? "");
  }

  save(): void {
    if (this.isPublic || !this.fahrzeugId) return;

    const results = Object.entries(this.draft).map(([key, v]) => ({
      item_id: Number(key),
      status: v.status ?? "ok",
      menge_aktuel: v.menge_aktuel ?? null,
      notiz: v.notiz ?? "",
    }));

    if (results.length === 0) {
      this.gds.erstelleMessage("info", "Keine Einträge zum Speichern.");
      return;
    }

    this.gds.post(`fahrzeuge/${this.fahrzeugId}/checks`, { results }).subscribe({
      next: () => {
        this.gds.erstelleMessage("success", "Check gespeichert.");
        this.draft = {};
      },
      error: (err: any) => this.gds.errorAnzeigen(err),
    });
  }
}
