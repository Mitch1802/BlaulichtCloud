import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";

import { GlobalDataService } from "../_service/global-data.service";
import { IFahrzeugDetail } from "../_interface/fahrzeug";
import { CHECK_STATUS_OPTIONS, CheckStatus } from "./fahrzeug.constants";

type ResultFG = FormGroup<{
  item_id: FormControl<string>;
  status: FormControl<CheckStatus>;
  menge_aktuel: FormControl<number | null>;
  notiz: FormControl<string>;
}>;

type CheckForm = FormGroup<{
  title: FormControl<string>;
  notiz: FormControl<string>;
  results: FormArray<ResultFG>;
}>;

@Component({
  standalone: true,
  selector: "app-fahrzeug-check",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatFormFieldModule,
  ],
  templateUrl: "./fahrzeug-check.component.html",
})
export class FahrzeugCheckComponent implements OnInit {
  private gds = inject(GlobalDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  breadcrumb: { label: string; url?: string }[] = [];

  fahrzeugId = "";
  fahrzeug: IFahrzeugDetail | null = null;

  statusOptions = CHECK_STATUS_OPTIONS;

  form: CheckForm = this.fb.group({
    title: this.fb.control("", { nonNullable: true }),
    notiz: this.fb.control("", { nonNullable: true }),
    results: this.fb.array<ResultFG>([]),
  });

  ngOnInit(): void {
    this.breadcrumb = this.gds.ladeBreadcrumb();
    this.fahrzeugId = String(this.route.snapshot.paramMap.get("id") ?? "");
    if (!this.fahrzeugId) return;

    this.load();
  }

  private load(): void {
    this.gds.get(`fahrzeuge/${this.fahrzeugId}`).subscribe({
      next: (fz: any) => {
        this.fahrzeug = fz as IFahrzeugDetail;
        this.buildForm();
      },
      error: (e) => this.gds.errorAnzeigen(e),
    });
  }

  private makeResultFG(itemId: string, mengeSoll: number): ResultFG {
    return this.fb.group({
      item_id: this.fb.control(itemId, { nonNullable: true, validators: [Validators.required] }),
      status: this.fb.control<CheckStatus>("ok", { nonNullable: true, validators: [Validators.required] }),
      menge_aktuel: this.fb.control<number | null>(mengeSoll ?? null),
      notiz: this.fb.control("", { nonNullable: true }),
    });
  }

  private buildForm(): void {
    const arr = this.form.controls.results;
    arr.clear();

    const fz = this.fahrzeug;
    if (!fz) return;

    for (const raum of fz.raeume ?? []) {
      for (const item of raum.items ?? []) {
        arr.push(this.makeResultFG(String(item.id), Number(item.menge)));
      }
    }
  }

  submit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.gds.erstelleMessage("error", "Check unvollständig");
      return;
    }

    // Backend erwartet: { title?, notiz?, results: [{item_id,status,menge_aktuel?,notiz?}] }
    const payload = {
      title: this.form.controls.title.value,
      notiz: this.form.controls.notiz.value,
      results: this.form.controls.results.controls.map((fg) => ({
        item_id: fg.controls.item_id.value,
        status: fg.controls.status.value,
        menge_aktuel: fg.controls.menge_aktuel.value ?? null,
        notiz: fg.controls.notiz.value ?? "",
      })),
    };

    this.gds.post(`fahrzeuge/${this.fahrzeugId}/checks`, payload).subscribe({
      next: () => {
        this.gds.erstelleMessage("success", "Check gespeichert");
        this.router.navigate(["/fahrzeuge"]);
      },
      error: (e) => this.gds.errorAnzeigen(e),
    });
  }
}
