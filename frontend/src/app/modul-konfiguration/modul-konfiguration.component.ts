import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { HeaderComponent } from '../_template/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { IPdfTemplate } from '../_interface/pdf_template';

@Component({
  selector: 'app-modul-konfiguration',
  imports: [
    HeaderComponent,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    MatInput,
    MatError
  ],
  templateUrl: './modul-konfiguration.component.html',
  styleUrls: ['./modul-konfiguration.component.sass']
})
export class ModulKonfigurationComponent implements OnInit {
  globalDataService = inject(GlobalDataService);
  router = inject(Router);

  title = 'Modul Konfiguration';
  modul = 'modul_konfiguration';
  breadcrumb: any[] = [];

  verfuegbareModulListe: any = [
    { key: 'start', label: 'Startseite' },
    { key: 'fmd', label: 'FMD' },
    { key: 'pdf', label: 'PDF Templates Zuweisung' },
  ];

  modulListe: any = [];
  private modulByKey = new Map<string, any>();

  formModul = new FormGroup({
    id: new FormControl<number | null>(null),
    modul: new FormControl<string>('', Validators.required),
    konfiguration: new FormControl<string>('', [Validators.required, this.validJson()]),
  });

  pdfExports = [
    { key: 'idPdfCheckliste', label: 'FMD: Deckblatt (Checkliste)' },
    { key: 'idPdfListe', label: 'FMD: Listen (Tauglichkeit/Leistungstest/Untersuchungen)' },
  ] as const;

  pdfTemplates: IPdfTemplate[] = [];
  private pdfTemplatesLoaded = false;

  pdfMappingForm = new FormGroup({
    idPdfCheckliste: new FormControl<string | null>(null, Validators.required),
    idPdfListe: new FormControl<string | null>(null, Validators.required),
  });

  ngOnInit(): void {
    sessionStorage.setItem('PageNumber', '2');
    sessionStorage.setItem('Page2', 'V_MK');
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();
    this.formModul.enable();
    this.formModul.controls['id'].disable();

    // Modul-Konfig laden
    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
          this.modulListe = erg.main ?? [];
          this.modulByKey = new Map(this.modulListe.map((x: any) => [x.modul, x]));
        } catch (e: any) {
          this.globalDataService.erstelleMessage('error', e);
        }
      },
      error: (error: any) => this.globalDataService.errorAnzeigen(error)
    });

    // Wenn user im PDF-Form was ändert => JSON-String im formModul.konfiguration mitschreiben
    this.pdfMappingForm.valueChanges.subscribe(() => {
      if (this.formModul.controls['modul'].value === 'pdf') {
        this.syncPdfMappingToKonfigurationControl();
      }
    });
  }

  onModulChange(): void {
    const key = this.formModul.controls['modul'].value;
    if (!key) return;

    const details = this.modulByKey.get(key);

    // Formular ist bereits enabled (wir bleiben immer im selben Formular)
    this.formModul.enable();

    // Neu (noch kein Datensatz)
    if (!details) {
      this.formModul.patchValue({
        id: null,
        modul: key,
        konfiguration: JSON.stringify({}, null, 2),
      }, { emitEvent: false });

      if (key === 'pdf') {
        this.loadPdfTemplatesOnce();
        this.initPdfMappingFromConfigObject({});
      }
      return;
    }

    // Bestehend
    this.formModul.patchValue({
      id: details.id,
      modul: details.modul,
      konfiguration: JSON.stringify(details.konfiguration ?? {}, null, 2),
    }, { emitEvent: false });

    if (key === 'pdf') {
      this.loadPdfTemplatesOnce();
      this.initPdfMappingFromConfigObject(details.konfiguration ?? {});
    }
  }

  datenSpeichern(): void {
    // Achtung: bei pdf prüfen wir pdfMappingForm zusätzlich
    if (this.formModul.invalid) {
      this.globalDataService.erstelleMessage('error', 'Bitte alle Pflichtfelder korrekt ausfüllen!');
      return;
    }

    const objekt: any = this.formModul.value;
    const idValue = this.formModul.controls['id'].value;

    if (objekt.modul === 'pdf') {
      if (this.pdfMappingForm.invalid) {
        this.globalDataService.erstelleMessage('error', 'Bitte PDF-Templates für alle Funktionen auswählen!');
        return;
      }

      // OPTION A: NUR IDs speichern
      objekt.konfiguration = {
        idPdfCheckliste: this.pdfMappingForm.controls['idPdfCheckliste'].value,
        idPdfListe: this.pdfMappingForm.controls['idPdfListe'].value,
      };

      // (optional, aber sinnvoll): JSON-String im formModul sauber halten
      this.formModul.controls['konfiguration'].setValue(
        JSON.stringify(objekt.konfiguration, null, 2),
        { emitEvent: false }
      );
    } else {
      objekt.konfiguration = JSON.parse(objekt.konfiguration);
    }

    if (!idValue) {
      this.globalDataService.post(this.modul, objekt, false).subscribe({
        next: (saved: any) => {
          try {
            this.modulByKey.set(saved.modul, saved);
            this.formModul.reset();
            this.setzeSelectZurueck();
            this.globalDataService.erstelleMessage('success', 'Konfiguration gespeichert!');
          } catch (e: any) {
            this.globalDataService.erstelleMessage('error', e);
          }
        },
        error: (error: any) => this.globalDataService.errorAnzeigen(error)
      });
    } else {
      this.globalDataService.patch(this.modul, idValue, objekt, false).subscribe({
        next: (saved: any) => {
          try {
            this.modulByKey.set(saved.modul, saved);
            this.formModul.reset();
            this.setzeSelectZurueck();
            this.globalDataService.erstelleMessage('success', 'Konfiguration geändert!');
          } catch (e: any) {
            this.globalDataService.erstelleMessage('error', e);
          }
        },
        error: (error: any) => this.globalDataService.errorAnzeigen(error)
      });
    }
  }

  datenLoeschen(): void {
    const id = this.formModul.controls['id'].value!;
    if (!id) {
      this.globalDataService.erstelleMessage('error', 'Keine Modul Konfiguration ausgewählt zum Löschen!');
      return;
    }

    this.globalDataService.delete(this.modul, id).subscribe({
      next: () => {
        try {
          this.modulListe = this.modulListe.filter((m: any) => m.id !== id);

          this.formModul.reset();
          this.setzeSelectZurueck();

          this.globalDataService.erstelleMessage('success', 'Modul Konfiguration erfolgreich gelöscht!');
        } catch (e: any) {
          this.globalDataService.erstelleMessage('error', e);
        }
      },
      error: (error: any) => this.globalDataService.errorAnzeigen(error)
    });
  }

  setzeSelectZurueck(): void {
    this.formModul.controls['modul'].setValue('', { emitEvent: false });
  }

  // -----------------------
  // PDF helpers
  // -----------------------
  private loadPdfTemplatesOnce(): void {
    if (this.pdfTemplatesLoaded) return;

    // gleicher Endpoint wie in PdfTemplatesComponent: modul = 'pdf/templates'
    this.globalDataService.get('pdf/templates').subscribe({
      next: (erg: any) => {
        this.pdfTemplates = (erg?.main ?? erg ?? []) as IPdfTemplate[];
        this.pdfTemplatesLoaded = true;
      },
      error: (error: any) => this.globalDataService.errorAnzeigen(error),
    });
  }

  private initPdfMappingFromConfigObject(cfg: any): void {
    this.pdfMappingForm.patchValue({
      idPdfCheckliste: cfg?.idPdfCheckliste ?? null,
      idPdfListe: cfg?.idPdfListe ?? null,
    }, { emitEvent: false });

    this.syncPdfMappingToKonfigurationControl();
  }

  private syncPdfMappingToKonfigurationControl(): void {
    const json = JSON.stringify(this.pdfMappingForm.value ?? {}, null, 2);
    this.formModul.controls['konfiguration'].setValue(json, { emitEvent: false });
  }

  // -----------------------
  // JSON validator
  // -----------------------
  private validJson(): ValidatorFn {
    return (control: AbstractControl) => {
      const v = control.value;
      if (!v) return null;
      try {
        JSON.parse(v);
        return null;
      } catch {
        return { jsonInvalid: true };
      }
    };
  }
}
