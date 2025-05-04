import { Component, OnInit, inject } from '@angular/core';
import { IMitglied } from 'src/app/_interface/mitglied';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { HeaderComponent } from '../_template/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { IATSTraeger } from '../_interface/atstraeger';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-fmd',
  standalone: true,
  imports: [
    CommonModule,
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
    MatCheckbox,
    MatHint,
    MatTableModule,
    BaseChartDirective
  ],
  templateUrl: './fmd.component.html',
  styleUrl: './fmd.component.sass'
})
export class FmdComponent implements OnInit {
  globalDataService = inject(GlobalDataService);
  router = inject(Router);

  title = "FMD";
  modul = "fmd";

  mitglieder: IMitglied[] = [];
  atstraeger: IATSTraeger[] = [];
  currentYear = new Date().getFullYear();

  get freieMitglieder(): IMitglied[] {
    return this.mitglieder.filter(m =>
      !this.atstraeger.some(a => a.mitglied_id === m.pkid)
    );
  }

  get dropdownMitglieder(): IMitglied[] {
    const frei = this.freieMitglieder;
    const currentId = this.formModul.controls['mitglied_id'].value as string;
    let liste: IMitglied[];

    if (currentId) {
      const aktuell = this.mitglieder.find(m => m.pkid === currentId);
      if (aktuell && !frei.some(m => m.pkid === currentId)) {
        liste = [aktuell, ...frei];
      } else {
        liste = frei;
      }
    } else {
      liste = frei;
    }

    return this.globalDataService.arraySortByKey(liste, 'stbnr');
  }

  breadcrumb: any = [];

  sichtbareSpaltenUntersuchung: string[] = ['stbnr', 'vorname', 'nachname', 'letzte_untersuchung', 'naechste_untersuchung'];
  sichtbareSpaltenLeistungstest: string[] = ['stbnr', 'vorname', 'nachname', 'leistungstest', 'leistungstest_art'];
  sichtbareSpaltenTauglichkeit: string[] = ['stbnr', 'vorname', 'nachname', 'tauglichkeit'];

  public pieChartType: ChartType = 'doughnut';

  public pieChartData: ChartData<'doughnut', number[], string | string[]> = {
    labels: [ 'Fahrzeuge', 'Feuerwehr', 'Polizei' ],
    datasets: [
      { data: [12, 19, 7] }
    ]
  };

  formAuswahl = new FormGroup({
    atstraeger: new FormControl(0)
  });

  formModul = new FormGroup({
    id: new FormControl(0),
    mitglied_id: new FormControl(''),
    hausarzt: new FormControl(''),
    letzte_untersuchung: new FormControl('', [
      Validators.pattern(/^([0-3]\d)\.([0-1]\d)\.(\d{4})$/),
      this.validDateDDMMYYYY()
    ]),
    leistungstest: new FormControl(''),
    leistungstest_art: new FormControl(''),
    notizen: new FormControl(''),
    fdisk_aenderung: new FormControl('', [
      Validators.pattern(/^([0-3]\d)\.([0-1]\d)\.(\d{4})$/),
      this.validDateDDMMYYYY()
    ]),
  });

  leistungstestarten: any = [
    "Finnentest",
    "Fahrrad",
    "Cooper"
  ]

  modul_konfig: any = {};

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "2");
    sessionStorage.setItem("Page2", "FMD");
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();
    this.formModul.disable();

    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
          const konfigs = erg.data.modul_konfig.find((m: any) => m.modul === 'fmd');
          this.modul_konfig = konfigs?.konfiguration ?? [];

          const mains = erg.data.main as any[];
          this.mitglieder = erg.data.mitglieder as any[];
          const memberMap = new Map<number, any>(this.mitglieder.map((m: any) => [m.pkid, m]));

          this.atstraeger = mains.map(item => {
            const mitg = memberMap.get(item.mitglied_id) || {};
            return {
              ...item,
              stbnr: mitg.stbnr,
              vorname: mitg.vorname,
              nachname: mitg.nachname,
              geburtsdatum: mitg.geburtsdatum
            };
          });

          this.mitglieder = this.globalDataService.arraySortByKey(this.mitglieder, 'stbnr');
          this.atstraeger = this.globalDataService.arraySortByKey(this.atstraeger, 'stbnr');

          this.updateTauglichkeitFürAlle();
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  setzeSelectZurueck(): void {
    this.formAuswahl.controls["atstraeger"].setValue(0, { onlySelf: true });
  }

  neueDetails(): void {
    this.formModul.enable();
    this.setzeSelectZurueck();
  }

  auswahlBearbeiten(): void {
    const id = this.formAuswahl.controls['atstraeger'].value;
    if (id === 0) {
      return;
    }
    const abfrageUrl = `${this.modul}/${id}`;

    this.globalDataService.get(abfrageUrl).subscribe({
      next: (erg: any) => {
        try {
          const details: IATSTraeger = erg.data.fmd;

          this.formModul.enable();
          this.formModul.setValue({
            id: details.id,
            mitglied_id: details.mitglied_id,
            hausarzt: details.hausarzt,
            letzte_untersuchung: details.letzte_untersuchung,
            leistungstest: details.leistungstest,
            leistungstest_art: details.leistungstest_art,
            notizen: details.notizen,
            fdisk_aenderung: details.fdisk_aenderung
          });
          this.setzeSelectZurueck();
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

    const mitglied = this.mitglieder.find(m => m.pkid === objekt.mitglied_id);
    const gebDatum = mitglied?.geburtsdatum ?? null;
    const alter = this.berechneAlter(gebDatum);

    if (objekt.letzte_untersuchung != '') {
      const parts = objekt.letzte_untersuchung.split('.');
      if (parts.length === 3) {
        const [tag, monat, jahr] = parts.map((n: any) => parseInt(n, 10));
        if (!isNaN(tag) && !isNaN(monat) && !isNaN(jahr)) {
          const datum = new Date(jahr, monat - 1, tag);

          const match = this.modul_konfig.intervall
            .find((i: any) => alter >= i.von && alter <= i.bis);

          if (match) {
            const nextYear = datum.getFullYear() + match.intervall;
            objekt.naechste_untersuchung = nextYear.toString();
          } else {
            objekt.naechste_untersuchung = '';
          }
        }
      }
    }

    const currentYear = new Date().getFullYear();
    let testJahr: number | null = null;
    if (objekt.leistungstest) {
      const partsLS = objekt.leistungstest.split('.');
      if (partsLS.length === 3) {
        const [, , jahrLS] = partsLS.map((n: any) => parseInt(n, 10));
        if (!isNaN(jahrLS)) testJahr = jahrLS;
      }
    }

    if (
      objekt.letzte_untersuchung != '' &&
      objekt.leistungstest      != '' &&
      objekt.naechste_untersuchung > currentYear &&
      testJahr === currentYear
    ) {
      objekt.tauglichkeit = 'tauglich';
    } else {
      objekt.tauglichkeit = 'nein';
    }

    if (!idValue) {
      this.globalDataService.post(this.modul, objekt, false).subscribe({
        next: (erg: any) => {
          try {
            const newTraeger: any = erg.data;
            const mitg = this.mitglieder.find(m => m.pkid === newTraeger.mitglied_id);

            if (mitg) {
              newTraeger.stbnr     = mitg.stbnr;
              newTraeger.vorname  = mitg.vorname;
              newTraeger.nachname = mitg.nachname;
            }
            
            this.atstraeger.push(newTraeger);
            this.atstraeger = this.globalDataService.arraySortByKey(this.atstraeger, 'stbnr');

            this.formModul.reset({
              id: 0,
              mitglied_id: '',
              hausarzt: '',
              letzte_untersuchung: '',
              leistungstest: '',
              leistungstest_art: '',
              notizen: '',
              fdisk_aenderung: ''
            });
            this.formModul.disable();
            this.setzeSelectZurueck();

            this.globalDataService.erstelleMessage('success', 'ATS Träger gespeichert!');
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
            const updated: any = erg.data;
            const mitg = this.mitglieder.find(m => m.pkid === updated.mitglied_id);
            if (mitg) {
              updated.stbnr     = mitg.stbnr;
              updated.vorname  = mitg.vorname;
              updated.nachname = mitg.nachname;
            }
            this.atstraeger = this.atstraeger
              .map(m => m.id === updated.id ? updated : m)
              .sort((a, b) => a.stbnr - b.stbnr);
              
            this.formModul.reset({
              id: 0,
              mitglied_id: '',
              hausarzt: '',
              letzte_untersuchung: '',
              leistungstest: '',
              leistungstest_art: '',
              notizen: '',
              fdisk_aenderung: ''
            });
            this.formModul.disable();
            this.setzeSelectZurueck();

            this.globalDataService.erstelleMessage('success', 'ATS Träger geändert!');
          } catch (e: any) {
            this.globalDataService.erstelleMessage('error', e);
          }
        },
        error: (error: any) => this.globalDataService.errorAnzeigen(error)
      });
    }
  }

  abbrechen(): void {
    this.globalDataService.erstelleMessage("info", "ATS Träger nicht gespeichert!");
    this.router.navigate(['/fmd']);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/fmd']);
  }

  datenLoeschen(): void {
    const id = this.formModul.controls['id'].value!;
    if (!id) {
      this.globalDataService.erstelleMessage('error', 'Kein ATS Träger ausgewählt zum Löschen!');
      return;
    }

    this.globalDataService.delete(this.modul, id).subscribe({
      next: (erg: any) => {
        try {
          this.atstraeger = this.atstraeger.filter((m: any) => m.id !== id);

          this.formModul.reset({
            id: 0,
            mitglied_id: '',
            hausarzt: '',
            letzte_untersuchung: '',
            leistungstest: '',
            leistungstest_art: '',
            notizen: '',
            fdisk_aenderung: ''
          });
          this.formModul.disable();
          this.setzeSelectZurueck();

          this.globalDataService.erstelleMessage('success', 'ATS Träger erfolgreich gelöscht!');
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
        return null; // let pattern-Validator die Format-Fehler melden
      }
      const [t, m, j] = v.split('.').map(x => +x);
      const d = new Date(j, m - 1, t);
      return (d.getFullYear() === j && d.getMonth() === m - 1 && d.getDate() === t)
        ? null
        : { dateInvalid: true };
    };
  }

  berechneAlter(geburtsdatum?: string | Date | null): number {
    if (!geburtsdatum) {
      return 0;
    }

    let geb: Date;
    if (typeof geburtsdatum === 'string') {
      const parts = geburtsdatum.split('.');
      if (parts.length !== 3) {
        return 0;
      }
      const [t, m, j] = parts.map(n => parseInt(n, 10));
      geb = new Date(j, m - 1, t);
      if (isNaN(geb.getTime())) {
        return 0;
      }
    } else {
      geb = geburtsdatum;
    }

    const today = new Date();
    let age = today.getFullYear() - geb.getFullYear();
    const monDiff = today.getMonth() - geb.getMonth();
    const dayDiff = today.getDate() - geb.getDate();
    if (monDiff < 0 || (monDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  }

  updateTauglichkeitFürAlle(): void {
    const currentYear = new Date().getFullYear();
    this.atstraeger.forEach(item => {
      const lastYear = this.getYearFromDate(item.letzte_untersuchung);
      const testYear = this.getYearFromDate(item.leistungstest);
      const nextYear = item.naechste_untersuchung
        ? parseInt(item.naechste_untersuchung, 10)
        : NaN;
  
      if (
        !isNaN(lastYear) &&
        !isNaN(testYear) &&
        Boolean(item.leistungstest) &&
        lastYear > 0 &&
        testYear === currentYear &&
        !isNaN(nextYear) &&
        nextYear > currentYear
      ) {
        item.tauglichkeit = 'tauglich';
      } else {
        item.tauglichkeit = 'nein';
      }
    });
  }

  getYearFromDate(dateStr?: string): number {
    if (!dateStr) return NaN;
    const parts = dateStr.split('.');
    return parts.length === 3 ? parseInt(parts[2], 10) : NaN;
  }
}
