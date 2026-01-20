import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";

import { HeaderComponent } from "../_template/header/header.component";
import { GlobalDataService } from "../_service/global-data.service";
import { IFahrzeugPublic } from "../_interface/fahrzeug";
import { CHECK_STATUS_OPTIONS, CheckStatus } from "../_const/check-status";


type CheckStatus = "ok" | "missing" | "damaged";

@Component({
  standalone: true,
  selector: "app-public-fahrzeug",
  imports: [
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,

    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: "./public-fahrzeug.component.html",
})
export class PublicFahrzeugComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private gds = inject(GlobalDataService);
  private fb = inject(FormBuilder);

  breadcrumb: { label: string; url?: string }[] = [];

  publicId = "";
  token: string | null = null;readonly STATUS_OPTIONS = CHECK_STATUS_OPTIONS;

  loading = false;
  verified = false;

  fahrzeug: IFahrzeugPublic | null = null;

  draft: Record<
    string,
    { status: CheckStatus; menge_aktuel?: number | null; notiz?: string }
  > = {};


  pinForm = this.fb.group({
    pin: this.fb.control<string>("", {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
  });

  ngOnInit(): void {
    this.breadcrumb = this.gds.ladeBreadcrumb();

    this.publicId = String(this.route.snapshot.paramMap.get("publicId") ?? "");
    if (!this.publicId) return;

    this.token = sessionStorage.getItem(this.tokenKey());
    if (this.token) {
      this.verified = true;
      this.loadPublicDetail();
    }
  }

  private tokenKey(): string {
    return `public_token_global`;
  }

  verifyPin(): void {
    this.pinForm.markAllAsTouched();
    if (this.pinForm.invalid) return;

    const pin = this.pinForm.controls.pin.value.trim();
    this.loading = true;

    this.gds
      .post(`public/pin/verify`, { pin })
      .subscribe({
        next: (res: any) => {
          const access = String(res?.access_token ?? "");
          if (!access) {
            this.gds.erstelleMessage("error", "Kein Token erhalten.");
            return;
          }

          sessionStorage.setItem(this.tokenKey(), access);
          this.token = access;
          this.verified = true;
          this.pinForm.reset({ pin: "" });
          this.loadPublicDetail();
        },
        error: (err: any) => this.gds.errorAnzeigen(err),
      })
      .add(() => (this.loading = false));
  }

  logoutPublic(): void {
    sessionStorage.removeItem(this.tokenKey());
    this.token = null;
    this.verified = false;
    this.fahrzeug = null;
    this.draft = {};
    this.pinForm.reset({ pin: "" });
  }

  private loadPublicDetail(): void {
    if (!this.token) return;

    this.loading = true;
    this.gds
      .getWithBearer(`public/fahrzeuge/${this.publicId}`, this.token)
      .subscribe({
        next: (res: any) => {
          this.fahrzeug = res as IFahrzeugPublic;
          this.initDraft();
        },
        error: (err: any) => this.gds.errorAnzeigen(err),
      })
      .add(() => (this.loading = false));
  }

  private initDraft(): void {
    this.draft = {};
    for (const raum of this.fahrzeug?.raeume ?? []) {
      for (const item of raum.items ?? []) {
        this.draft[this.keyFor(raum.name, item.reihenfolge, item.name)] = { status: "ok" };
      }
    }
  }

  keyFor(raumName: string, reihenfolge: number, itemName: string): string {
    return `${(raumName ?? "").trim()}::${reihenfolge ?? 0}::${(itemName ?? "").trim()}`.toLowerCase();
  }

  draftFor(raumName: string, item: any) {
    const k = this.keyFor(raumName, item.reihenfolge, item.name);
    this.draft[k] ??= { status: "ok" };
    return this.draft[k];
  }

  setStatus(raumName: string, item: any, status: CheckStatus): void {
    this.draftFor(raumName, item).status = status;
  }

  setIst(raumName: string, item: any, value: any): void {
    const num = value === "" || value === null || value === undefined ? null : Number(value);
    this.draftFor(raumName, item).menge_aktuel = Number.isFinite(num as number) ? (num as number) : null;
  }

  setNotiz(raumName: string, item: any, value: any): void {
    this.draftFor(raumName, item).notiz = String(value ?? "");
  }
}
