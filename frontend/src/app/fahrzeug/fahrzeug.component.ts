import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild, inject } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDividerModule } from "@angular/material/divider";

import { HeaderComponent } from "../_template/header/header.component";
import { GlobalDataService } from "../_service/global-data.service";

import {
  IFahrzeugDetail,
  IFahrzeugList,
  IFahrzeugRaum,
  IRaumItem,
} from "../_interface/fahrzeug";

type ItemDraftFG = FormGroup<{
  name: FormControl<string>;
  menge: FormControl<number>;
  einheit: FormControl<string>;
  notiz: FormControl<string>;
  reihenfolge: FormControl<number>;
}>;

@Component({
  standalone: true,
  selector: "app-fahrzeug",
  imports: [
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDividerModule,
  ],
  templateUrl: "./fahrzeug.component.html",
  styleUrl: "./fahrzeug.component.sass",
})
export class FahrzeugComponent implements OnInit {
  private gds = inject(GlobalDataService);
  private fb = inject(FormBuilder);

  breadcrumb: { label: string; url?: string }[] = [];
  modul = "fahrzeuge";

  fahrzeuge: IFahrzeugList[] = [];
  dataSource = new MatTableDataSource<IFahrzeugList>([]);
  sichtbareSpalten: string[] = ["name", "bezeichnung", "public_id", "actions"];

  selectedId: number | null = null;
  selected: IFahrzeugDetail | null = null;

  // Fahrzeug (create/update)
  fahrzeugForm = this.fb.group({
    id: this.fb.control<number | null>(null),
    name: this.fb.control<string>("", { nonNullable: true, validators: [Validators.required] }),
    bezeichnung: this.fb.control<string>("", { nonNullable: true }),
    beschreibung: this.fb.control<string>("", { nonNullable: true }),
  });

  // Raum (create)
  raumForm = this.fb.group({
    name: this.fb.control<string>("", { nonNullable: true, validators: [Validators.required] }),
    reihenfolge: this.fb.control<number>(0, { nonNullable: true }),
  });

  // Item-Form pro Raum (nur Add-Form, nicht Edit)
  itemForms = new Map<number, ItemDraftFG>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "2");
    sessionStorage.setItem("Page2", "FZ");
    this.breadcrumb = this.gds.ladeBreadcrumb();

    this.loadList();
  }

  private loadList(): void {
    this.gds.get(this.modul).subscribe({
      next: (res: any) => {
        this.fahrzeuge = (res as IFahrzeugList[]) ?? [];
        this.dataSource.data = this.fahrzeuge;

        setTimeout(() => {
          if (this.paginator) this.dataSource.paginator = this.paginator;
          if (this.sort) this.dataSource.sort = this.sort;
        });
      },
      error: (err: any) => this.gds.errorAnzeigen(err),
    });
  }

  selectRow(row: IFahrzeugList): void {
    this.selectedId = row.id;
    this.loadDetail(row.id);

    this.fahrzeugForm.setValue({
      id: row.id,
      name: row.name ?? "",
      bezeichnung: row.bezeichnung ?? "",
      beschreibung: "", // kommt aus Detail
    });
  }

  private loadDetail(id: number): void {
    this.gds.get(`${this.modul}/${id}`).subscribe({
      next: (res: any) => {
        this.selected = res as IFahrzeugDetail;

        this.fahrzeugForm.patchValue({
          beschreibung: this.selected?.beschreibung ?? "",
        });

        // Item-Add-Forms initialisieren pro Raum
        this.itemForms.clear();
        (this.selected?.raeume ?? []).forEach((r) => {
          this.itemForms.set(r.id, this.createItemDraftForm());
        });
      },
      error: (err: any) => this.gds.errorAnzeigen(err),
    });
  }

  newFahrzeug(): void {
    this.selectedId = null;
    this.selected = null;
    this.itemForms.clear();

    this.fahrzeugForm.reset({
      id: null,
      name: "",
      bezeichnung: "",
      beschreibung: "",
    });

    this.raumForm.reset({
      name: "",
      reihenfolge: 0,
    });
  }

  saveFahrzeug(): void {
    if (this.fahrzeugForm.invalid) {
      this.gds.erstelleMessage("error", "Bitte Name ausfüllen.");
      return;
    }

    const id = this.fahrzeugForm.controls.id.value;
    const payload = {
      name: this.fahrzeugForm.controls.name.value,
      bezeichnung: this.fahrzeugForm.controls.bezeichnung.value,
      beschreibung: this.fahrzeugForm.controls.beschreibung.value,
    };

    if (!id) {
      // create
      this.gds.post(this.modul, payload).subscribe({
        next: () => {
          this.gds.erstelleMessage("success", "Fahrzeug erstellt.");
          this.loadList();
          this.newFahrzeug();
        },
        error: (err: any) => this.gds.errorAnzeigen(err),
      });
    } else {
      // update
      this.gds.patch(this.modul, id, payload).subscribe({
        next: () => {
          this.gds.erstelleMessage("success", "Fahrzeug gespeichert.");
          this.loadList();
          this.loadDetail(id);
        },
        error: (err: any) => this.gds.errorAnzeigen(err),
      });
    }
  }

  deleteFahrzeug(row: IFahrzeugList): void {
    if (!confirm(`Fahrzeug "${row.name}" wirklich löschen?`)) return;

    this.gds.delete(this.modul, row.id).subscribe({
      next: () => {
        this.gds.erstelleMessage("success", "Fahrzeug gelöscht.");
        if (this.selectedId === row.id) this.newFahrzeug();
        this.loadList();
      },
      error: (err: any) => this.gds.errorAnzeigen(err),
    });
  }

  // =========================
  // Räume (nested)
  // =========================
  addRaum(): void {
    if (!this.selectedId) {
      this.gds.erstelleMessage("error", "Bitte zuerst ein Fahrzeug auswählen.");
      return;
    }
    if (this.raumForm.invalid) {
      this.gds.erstelleMessage("error", "Raumname fehlt.");
      return;
    }

    const payload = {
      name: this.raumForm.controls.name.value,
      reihenfolge: this.raumForm.controls.reihenfolge.value,
    };

    this.gds.post(`fahrzeuge/${this.selectedId}/raeume`, payload).subscribe({
      next: () => {
        this.gds.erstelleMessage("success", "Raum angelegt.");
        this.raumForm.reset({ name: "", reihenfolge: 0 });
        this.loadDetail(this.selectedId!);
      },
      error: (err: any) => this.gds.errorAnzeigen(err),
    });
  }

  onDeleteRaum(event: Event, raum: IFahrzeugRaum): void {
    event.stopPropagation();
    this.deleteRaum(raum);
  }

  private deleteRaum(raum: IFahrzeugRaum): void {
    if (!this.selectedId) return;
    if (!confirm(`Raum "${raum.name}" wirklich löschen? (Items werden mitgelöscht)`)) return;

    this.gds.delete(`fahrzeuge/${this.selectedId}/raeume`, raum.id).subscribe({
      next: () => {
        this.gds.erstelleMessage("success", "Raum gelöscht.");
        this.loadDetail(this.selectedId!);
      },
      error: (err: any) => this.gds.errorAnzeigen(err),
    });
  }

  // =========================
  // Items (nested)
  // =========================
  private createItemDraftForm(): ItemDraftFG {
    return this.fb.group({
      name: this.fb.control<string>("", { nonNullable: true, validators: [Validators.required] }),
      menge: this.fb.control<number>(1, { nonNullable: true, validators: [Validators.required] }),
      einheit: this.fb.control<string>("", { nonNullable: true }),
      notiz: this.fb.control<string>("", { nonNullable: true }),
      reihenfolge: this.fb.control<number>(0, { nonNullable: true }),
    });
  }

  itemFormFor(raumId: number): ItemDraftFG {
    const f = this.itemForms.get(raumId);
    if (f) return f;

    const created = this.createItemDraftForm();
    this.itemForms.set(raumId, created);
    return created;
  }

  addItem(raum: IFahrzeugRaum): void {
    const f = this.itemFormFor(raum.id);
    f.markAllAsTouched();

    if (f.invalid) {
      this.gds.erstelleMessage("error", "Item-Name fehlt.");
      return;
    }

    const payload = {
      name: f.controls.name.value.trim(),
      menge: f.controls.menge.value,
      einheit: f.controls.einheit.value,
      notiz: f.controls.notiz.value,
      reihenfolge: f.controls.reihenfolge.value,
    };

    this.gds.post(`raeume/${raum.id}/items`, payload).subscribe({
      next: () => {
        this.gds.erstelleMessage("success", "Item angelegt.");
        f.reset({ name: "", menge: 1, einheit: "", notiz: "", reihenfolge: 0 });
        if (this.selectedId) this.loadDetail(this.selectedId);
      },
      error: (err: any) => this.gds.errorAnzeigen(err),
    });
  }

  deleteItem(raum: IFahrzeugRaum, item: IRaumItem): void {
    if (!confirm(`Item "${item.name}" wirklich löschen?`)) return;

    this.gds.delete(`raeume/${raum.id}/items`, item.id).subscribe({
      next: () => {
        this.gds.erstelleMessage("success", "Item gelöscht.");
        if (this.selectedId) this.loadDetail(this.selectedId);
      },
      error: (err: any) => this.gds.errorAnzeigen(err),
    });
  }
}
