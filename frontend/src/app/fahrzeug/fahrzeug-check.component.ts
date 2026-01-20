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

import { HeaderComponent } from "../_template/header/header.component";
import { GlobalDataService } from "../_service/global-data.service";
import { CheckStatus, IFahrzeugDetail } from "../_interface/fahrzeug";
import { CHECK_STATUS_OPTIONS, CheckStatus } from "../_const/check-status";


type ResultFG = FormGroup<{
  item_id: FormControl<string>;
  status: FormControl<CheckStatus>;
  menge_aktuel: FormControl<number | null>;
  notiz: FormControl<string>;
}>;

@Component({
  standalone: true,
  selector: "app-fahrzeug-check",
  imports: [
    CommonModule,
    ReactiveFormsModule,

    HeaderComponent,

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

  fahrzeugId!: string;
  fahrzeug: IFahrzeugDetail | null = null;
  readonly STATUS_OPTIONS = CHECK_STATUS_OPTIONS;

  form = this.fb.group({
    title: this.fb.control<string>("", { nonNullable: true }),
    notiz: this.fb.control<string>("", { nonNullable: true }),
    results: this.fb.array<ResultFG>([]),
  });

  get resultsFA(): FormArray<ResultFG> {
    return this.form.controls.results;
  }

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "3");
    sessionStorage.setItem("Page3", "FZ");
    this.breadcrumb = this.gds.ladeBreadcrumb();

    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      this.gds.erstelleMessage("error", "Fahrzeug-ID fehlt.");
      this.router.navigate(["/fahrzeuge"]);
      return;
    }
    this.fahrzeugId = id;

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

  private buildForm(): void {
    this.resultsFA.clear();

    if (!this.fahrzeug) return;

    for (const raum of this.fahrzeug.raeume ?? []) {
      for (const item of raum.items ?? []) {
        this.resultsFA.push(
          this.fb.group({
            item_id: this.fb.control<string>(item.id, {
              nonNullable: true,
              validators: [Validators.required],
            }),
            status: ["ok" as CheckStatus, Validators.required],
            menge_aktuel: this.fb.control<number | null>(
              item.menge ?? null
            ),
            notiz: this.fb.control<string>("", { nonNullable: true }),
          })
        );
      }
    }
  }

  submit(): void {
    this.form.markAllAsTouched();

    if (!this.fahrzeugId || this.form.invalid) {
      this.gds.erstelleMessage("error", "Check unvollständig");
      return;
    }

    // Backend erwartet { title?, notiz?, results: [...] }
    const payload = {
      title: this.form.controls.title.value ?? "",
      notiz: this.form.controls.notiz.value ?? "",
      results: this.resultsFA.getRawValue().map((r) => ({
        item_id: r.item_id,
        status: r.status,
        menge_aktuel: r.menge_aktuel ?? null,
        notiz: r.notiz ?? "",
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
