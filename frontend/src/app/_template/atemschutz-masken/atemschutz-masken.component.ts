import { Component, OnInit, inject } from '@angular/core';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IAtemschutzMasken } from 'src/app/_interface/atemschutz_masken';
import { MatIcon } from '@angular/material/icon';
import { IAtemschutzMaskenProtokoll } from 'src/app/_interface/atemschutz_masken_protokoll';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-atemschutz-masken',
  imports: [
    HeaderComponent,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    MatInput,
    MatError,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIcon,
    MatCheckboxModule
  ],
  templateUrl: './atemschutz-masken.component.html',
  styleUrl: './atemschutz-masken.component.sass'
})
export class AtemschutzMaskenComponent implements OnInit {
  globalDataService = inject(GlobalDataService);

  title = "Masken";
  title_modul = this.title;
  title_pruefung = "Masken Prüfung";
  modul = "atemschutz/masken";
  showPruefungTable: boolean = false;

  masken: IAtemschutzMasken[] = [];
  pruefungen: IAtemschutzMaskenProtokoll[] = [];
  breadcrumb: any = [];
  dataSource = new MatTableDataSource<IAtemschutzMasken>(this.masken);
  dataSourcePruefungen = new MatTableDataSource<IAtemschutzMaskenProtokoll>(this.pruefungen);
  sichtbareSpalten: string[] = ['inv_nr', 'bezeichnung', 'typ', 'actions'];
  sichtbareSpaltenPruefungen: string[] = ['datum', 'taetigkeit', 'name_pruefer', 'actions'];

  formModul = new FormGroup({
    id: new FormControl(''),
    inv_nr: new FormControl('', Validators.required),
    bezeichnung: new FormControl('', Validators.required),
    art: new FormControl(''),
    typ: new FormControl(''),
    eigentuemer: new FormControl(''),
    barcode: new FormControl(''),
    baujahr: new FormControl('')
  });

  formPruefung = new FormGroup({
    id: new FormControl(''),
    maske_id: new FormControl(0, Validators.required),
    datum: new FormControl('', [
      Validators.pattern(/^([0-3]\d)\.([0-1]\d)\.(\d{4})$/),
      this.validDateDDMMYYYY(),
      Validators.required
    ]),
    taetigkeit: new FormControl('', Validators.required),
    verwendung_typ: new FormControl(''),
    verwendung_min: new FormControl(0),
    wartung_2_punkt: new FormControl(''),
    wartung_unterdruck: new FormControl(''),
    wartung_oeffnungsdruck: new FormControl(''),
    wartung_scheibe: new FormControl(''),
    wartung_ventile: new FormControl(''),
    wartung_maengel: new FormControl(''),
    ausser_dienst: new FormControl(false),
    name_pruefer: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "3");
    sessionStorage.setItem("Page3", "ATM_M");
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();
    this.formModul.disable();
    this.formPruefung.disable();

    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
          this.masken = erg;
          this.dataSource.data = erg;
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  neueDetails(): void {
    this.formModul.enable();
  }

  neuePruefung(element: any): void {
    this.formPruefung.enable();
    this.title = this.title_pruefung;
  }

  auswahlBearbeiten(element: any): void {
    if (element.id === 0) {
      return;
    }
    const abfrageUrl = `${this.modul}/${element.id}`;

    this.globalDataService.get(abfrageUrl).subscribe({
      next: (erg: any) => {
        try {
          const details: IAtemschutzMasken = erg;

          this.formModul.enable();
          this.formModul.setValue({
            id: details.id,
            inv_nr: details.inv_nr,
            bezeichnung: details.bezeichnung,
            art: details.art,
            typ: details.typ,
            eigentuemer: details.eigentuemer,
            barcode: details.barcode,
            baujahr: details.baujahr
          });
        } catch (e: any) {
          this.globalDataService.erstelleMessage('error', e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  showMasken(): void {
    this.showPruefungTable = false;
    this.title = this.title_modul;
  }

  showPruefungen(element: any): void {
    if (element.id === 0) {
      return;
    }
    this.title = this.title_pruefung;

    const abfrageUrl = `${this.modul}/protokoll`;
    const param = { 'maske_id': element.pkid };

    this.globalDataService.get(abfrageUrl, param, true).subscribe({
      next: (erg: any) => {
        try {
          this.showPruefungTable = true;
          this.pruefungen = erg;
          this.dataSourcePruefungen.data = this.pruefungen;
        } catch (e: any) {
          this.globalDataService.erstelleMessage('error', e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  auswahlBearbeitenProtokoll(element: any): void {
    if (element.id === 0) {
      return;
    }
    const abfrageUrl = `${this.modul}/${element.id}`;

    this.globalDataService.get(abfrageUrl).subscribe({
      next: (erg: any) => {
        try {
          this.showPruefungTable = false;

          const details: IAtemschutzMaskenProtokoll = erg;

          this.formPruefung.enable();
          this.formPruefung.setValue({
            id: details.id,
            maske_id: details.maske_id,
            datum: details.datum,
            taetigkeit: details.taetigkeit,
            verwendung_typ: details.verwendung_typ,
            verwendung_min: details.verwendung_min,
            wartung_2_punkt: details.wartung_2_punkt,
            wartung_unterdruck: details.wartung_unterdruck,
            wartung_oeffnungsdruck: details.wartung_oeffnungsdruck,
            wartung_scheibe: details.wartung_scheibe,
            wartung_ventile: details.wartung_ventile,
            wartung_maengel: details.wartung_maengel,
            ausser_dienst: details.ausser_dienst,
            name_pruefer: details.name_pruefer,
          });
        } catch (e: any) {
          this.globalDataService.erstelleMessage('error', e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  datenSpeichern(): void {
    if (this.formModul.invalid) {
      this.globalDataService.erstelleMessage('error', 'Bitte alle Pflichtfelder korrekt ausfüllen!');
      return;
    }

    const objekt: any = this.formModul.value;
    const idValue = this.formModul.controls['id'].value;

    if (!idValue) {
      this.globalDataService.post(this.modul, objekt, false).subscribe({
        next: (erg: any) => {
          try {
            const newMask: IAtemschutzMasken = erg;
            this.masken.push(newMask);
            this.masken = this.globalDataService.arraySortByKey(this.masken, 'inv_nr');
            this.dataSource.data = this.masken;

            this.formModul.reset({
              id: '',
              inv_nr: '',
              bezeichnung: '',
              art: '',
              typ: '',
              eigentuemer: '',
              barcode: '',
              baujahr: ''
            });
            this.formModul.disable();
            this.globalDataService.erstelleMessage('success', 'Maske gespeichert!');
          } catch (e: any) {
            this.globalDataService.erstelleMessage('error', e);
          }
        },
        error: (error: any) => this.globalDataService.errorAnzeigen(error)
      });
    } else {
      this.globalDataService.patch(this.modul, idValue, objekt, false).subscribe({
        next: (erg: any) => {
          try {
            const updated: any = erg;
            this.masken = this.masken
              .map(m => m.id === updated.id ? updated : m)
              .sort((a, b) => a.inv_nr - b.inv_nr);

            this.dataSource.data = this.masken;

            this.formModul.reset({
              id: '',
              inv_nr: '',
              bezeichnung: '',
              art: '',
              typ: '',
              eigentuemer: '',
              barcode: '',
              baujahr: ''
            });
            this.formModul.disable();

            this.globalDataService.erstelleMessage('success', 'Maske geändert!');
          } catch (e: any) {
            this.globalDataService.erstelleMessage('error', e);
          }
        },
        error: (error: any) => this.globalDataService.errorAnzeigen(error)
      });
    }
  }

  datenSpeichernPruefung(): void {
    if (this.formPruefung.invalid) {
      this.globalDataService.erstelleMessage('error', 'Bitte alle Pflichtfelder korrekt ausfüllen!');
      return;
    }

    const objekt: any = this.formPruefung.value;
    const idValue = this.formPruefung.controls['id'].value;

    if (!idValue) {
      this.globalDataService.post(`${this.modul}/protokoll`, objekt, false).subscribe({
        next: (erg: any) => {
          try {
            const newPrufung: IAtemschutzMaskenProtokoll = erg;
            this.pruefungen.push(newPrufung);
            this.pruefungen = this.globalDataService.arraySortByKey(this.pruefungen, 'datum');
            this.dataSourcePruefungen.data = this.pruefungen;

            this.formPruefung.reset({
              id: '',
              maske_id: 0,
              taetigkeit: '',
              verwendung_typ: '',
              verwendung_min: 0,
              wartung_2_punkt: '',
              wartung_unterdruck: '',
              wartung_oeffnungsdruck: '',
              wartung_scheibe: '',
              wartung_ventile: '',
              wartung_maengel: '',
              ausser_dienst: false,
              name_pruefer: '',
            });
            this.formPruefung.disable();
            this.showPruefungTable = true;
            this.globalDataService.erstelleMessage('success', 'Prüfung gespeichert!');
          } catch (e: any) {
            this.globalDataService.erstelleMessage('error', e);
          }
        },
        error: (error: any) => this.globalDataService.errorAnzeigen(error)
      });
    } else {
      this.globalDataService.patch(`${this.modul}/protokoll`, idValue, objekt, false).subscribe({
        next: (erg: any) => {
          try {
            const updated: any = erg;
            this.pruefungen = this.pruefungen
              .map(m => m.id === updated.id ? updated : m)
              .sort((a, b) => a.datum - b.datum);

            this.dataSourcePruefungen.data = this.pruefungen;

            this.formPruefung.reset({
              id: '',
              maske_id: 0,
              taetigkeit: '',
              verwendung_typ: '',
              verwendung_min: 0,
              wartung_2_punkt: '',
              wartung_unterdruck: '',
              wartung_oeffnungsdruck: '',
              wartung_scheibe: '',
              wartung_ventile: '',
              wartung_maengel: '',
              ausser_dienst: false,
              name_pruefer: '',
            });
            this.formPruefung.disable();
            this.showPruefungTable = true;
            this.globalDataService.erstelleMessage('success', 'Prüfung geändert!');
          } catch (e: any) {
            this.globalDataService.erstelleMessage('error', e);
          }
        },
        error: (error: any) => this.globalDataService.errorAnzeigen(error)
      });
    }
  }

  abbrechen(): void {
    this.globalDataService.erstelleMessage("info", "Maske nicht gespeichert!");
    this.formModul.reset({
      id: '',
      inv_nr: '',
      bezeichnung: '',
      art: '',
      typ: '',
      eigentuemer: '',
      barcode: '',
      baujahr: ''
    });
    this.formModul.disable();
  }

  pruefungAbbrechen(): void {
    this.globalDataService.erstelleMessage("info", "Prüfung nicht gespeichert!");
    this.formPruefung.reset({
      id: '',
      maske_id: 0,
      taetigkeit: '',
      verwendung_typ: '',
      verwendung_min: 0,
      wartung_2_punkt: '',
      wartung_unterdruck: '',
      wartung_oeffnungsdruck: '',
      wartung_scheibe: '',
      wartung_ventile: '',
      wartung_maengel: '',
      ausser_dienst: false,
      name_pruefer: '',
    });
    this.formPruefung.disable();
    this.title = this.title_modul;
  }

  datenLoeschen(): void {
    const id = this.formModul.controls['id'].value!;
    if (!id) {
      this.globalDataService.erstelleMessage('error', 'Keine Maske ausgewählt zum Löschen!');
      return;
    }

    this.globalDataService.delete(this.modul, id).subscribe({
      next: (erg: any) => {
        try {
          this.masken = this.masken.filter((m: any) => m.id !== id);
          this.dataSource.data = this.masken;

          this.formModul.reset({
            id: '',
            inv_nr: '',
            bezeichnung: '',
            art: '',
            typ: '',
            eigentuemer: '',
            barcode: '',
            baujahr: ''
          });
          this.formModul.disable();

          this.globalDataService.erstelleMessage('success', 'Maske erfolgreich gelöscht!');
        } catch (e: any) {
          this.globalDataService.erstelleMessage('error', e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }



  validDateDDMMYYYY(): ValidatorFn {
    return (control: AbstractControl) => {
      const v: string = control.value;
      if (!v || !/^([0-3]\d)\.([0-1]\d)\.(\d{4})$/.test(v)) {
        return null;
      }
      const [t, m, j] = v.split('.').map(x => +x);
      const d = new Date(j, m - 1, t);
      return (d.getFullYear() === j && d.getMonth() === m - 1 && d.getDate() === t)
        ? null
        : { dateInvalid: true };
    };
  }
}
