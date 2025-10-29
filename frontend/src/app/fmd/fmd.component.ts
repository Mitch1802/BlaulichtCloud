import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, inject, QueryList, ViewChildren } from '@angular/core';
import { IMitglied } from 'src/app/_interface/mitglied';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { HeaderComponent } from '../_template/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { IATSTraeger } from '../_interface/atstraeger';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';

Chart.register(ChartDataLabels);

@Component({
    selector: 'app-fmd',
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
    BaseChartDirective,
    MatIconModule,
    MatPaginatorModule
],
    templateUrl: './fmd.component.html',
    styleUrl: './fmd.component.sass'
})

export class FmdComponent implements OnInit, AfterViewInit {
  globalDataService = inject(GlobalDataService);
  router = inject(Router);
  cd = inject(ChangeDetectorRef)

  title = "FMD";
  modul = "fmd";

  mitglieder: IMitglied[] = [];
  atstraeger: IATSTraeger[] = [];
  currentYear = new Date().getFullYear();
  activeTabIndex = 0;

  private readonly tabsMitTabelle = new Set<number>([1, 2, 3, 4]);
  private readonly sortIndexByTab: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 3 };

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

  pageOptions: any[] = [5,10,50,100]

  dataSource = new MatTableDataSource<IATSTraeger>(this.atstraeger);
  sichtbareSpaltenATS: string[] = ['stbnr', 'vorname', 'nachname', 'actions'];
  sichtbareSpaltenUntersuchung: string[] = ['stbnr', 'vorname', 'nachname', 'letzte_untersuchung', 'naechste_untersuchung'];
  sichtbareSpaltenLeistungstest: string[] = ['stbnr', 'vorname', 'nachname', 'leistungstest', 'leistungstest_art'];
  sichtbareSpaltenTauglichkeit: string[] = ['stbnr', 'vorname', 'nachname', 'tauglichkeit'];

  columnsByTab: string[][] = [
    [], // Übersicht
    this.sichtbareSpaltenATS,
    this.sichtbareSpaltenUntersuchung,
    this.sichtbareSpaltenLeistungstest,
    this.sichtbareSpaltenTauglichkeit
  ];

  public pieChartType: 'doughnut' = 'doughnut';
  public pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      datalabels: {
        color: '#000',
        font: {
          weight: 'bold',
          size: 14
        },
        formatter: (value, ctx) => {
          return value;
        }
      }
    }
  };

  chartAlter: ChartData<'doughnut', number[], string | string[]> = {
    labels: ['16-18', '19-39', '40-54', '55-65'],
    datasets: [{ data: [0,0,0,0], backgroundColor: ['#69c7a8', '#c973c4', '#d6b36d', '#cfc95d'] }]
  };

  chartTauglichkeit: ChartData<'doughnut', number[], string | string[]> = {
    labels: ['tauglich', 'kein Leistungstest', 'kein Arzt'],
    datasets: [{ data: [0,0,0], backgroundColor: ['#32a852', '#fcba56', '#bf6763'] }]
  };

  chartUntersuchung: ChartData<'doughnut', number[], string | string[]> = {
    labels: ['kein Arzt', 'gültig'],
    datasets: [{ data: [0,0], backgroundColor: ['#bf6763', '#32a852'] }]
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
    "unbekannt",
    "Finnentest",
    "Fahrrad",
    "Cooper (Laufen)"
  ]

  modul_konfig: any = {};

  @ViewChildren(BaseChartDirective) charts?: QueryList<BaseChartDirective>;
  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;
  @ViewChildren(MatSort) sorts?: QueryList<MatSort>;

  ngAfterViewInit() {
    if (this.hasTable(this.activeTabIndex) && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    this.setActiveSortForTab(this.activeTabIndex);
    this.updateFilterPredicateFor(this.activeTabIndex);
    this.triggerAllChartsUpdate();
  }

  hasTable(index: number): boolean {
    return this.tabsMitTabelle.has(index);
  }

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "2");
    sessionStorage.setItem("Page2", "FMD");
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();
    this.formModul.disable();

    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
          const konfigs = erg.modul_konfig.find((m: any) => m.modul === 'fmd');
          this.modul_konfig = konfigs?.konfiguration ?? [];

          const mains = erg.main as any[];
          this.mitglieder = erg.mitglieder as any[];
          const memberMap = new Map<number, any>(this.mitglieder.map((m: any) => [m.pkid, m]));

          this.atstraeger = mains.map(item => {
            const mitg = memberMap.get(item.mitglied_id) || {};
            return {
              ...item,
              stbnr: mitg.stbnr,
              vorname: mitg.vorname,
              nachname: mitg.nachname,
              geburtsdatum: mitg.geburtsdatum,
              hauptberuflich: mitg.hauptberuflich
            };
          });

          this.mitglieder = this.mitglieder.filter((m: any) => m.hauptberuflich == false);

          this.mitglieder = this.globalDataService.arraySortByKey(this.mitglieder, 'stbnr');
          this.atstraeger = this.globalDataService.arraySortByKey(this.atstraeger, 'stbnr');
          this.dataSource.data = this.atstraeger;
          this.updateTauglichkeitFürAlle();
          this.updateChartData();
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  applyFilter(value: string): void {
    this.dataSource.filter = (value || '').trim().toLowerCase();
    this.paginator?.firstPage();
  }

  neueDetails(): void {
    this.formModul.enable();
  }

  auswahlBearbeiten(element: any): void {
    if (element.id === 0) {
      return;
    }
    const abfrageUrl = `${this.modul}/${element.id}`;

    this.globalDataService.get(abfrageUrl).subscribe({
      next: (erg: any) => {
        try {
          const details: IATSTraeger = erg;

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
            const newTraeger: any = erg;
            const mitg = this.mitglieder.find(m => m.pkid === newTraeger.mitglied_id);

            if (mitg) {
              newTraeger.stbnr     = mitg.stbnr;
              newTraeger.vorname  = mitg.vorname;
              newTraeger.nachname = mitg.nachname;
              newTraeger.hauptberuflich = mitg.hauptberuflich;
            }

            this.atstraeger.push(newTraeger);
            this.atstraeger = this.globalDataService.arraySortByKey(this.atstraeger, 'stbnr');
            this.dataSource.data = this.atstraeger;
            this.updateChartData();

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
            const updated: any = erg;
            const mitg = this.mitglieder.find(m => m.pkid === updated.mitglied_id);
            if (mitg) {
              updated.stbnr     = mitg.stbnr;
              updated.vorname  = mitg.vorname;
              updated.nachname = mitg.nachname;
              updated.hauptberuflich = mitg.hauptberuflich;
            }
            this.atstraeger = this.atstraeger
              .map(m => m.id === updated.id ? updated : m)
              .sort((a, b) => a.stbnr - b.stbnr);

              this.dataSource.data = this.atstraeger;

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
            this.updateChartData();

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
          this.dataSource.data = this.atstraeger;
          this.updateChartData();

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
        return null;
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
        this.isOlderThanOneYear(item.leistungstest) == false &&
        !isNaN(nextYear) &&
        nextYear > currentYear
      ) {
        item.tauglichkeit = 'tauglich';
      } else {
        item.tauglichkeit = 'nein';
      }
    });
  }

  isOlderThanOneYear(dateStr?: string | Date | null): boolean {
    if (!dateStr) return false;

    if (typeof dateStr === 'string') {
      const parsedDate = new Date(dateStr);

      if (isNaN(parsedDate.getTime())) {
        return true;
      }

      dateStr = parsedDate;
    }

    if (dateStr instanceof Date) {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(new Date().getFullYear() - 1);

      return dateStr < oneYearAgo;
    }

    return false;
  }

  getYearFromDate(dateStr?: string | Date | null): number {
    if (!dateStr) return NaN;
    let str = '';

    if (dateStr instanceof Date) {
        str = `${dateStr.getDate()}.${dateStr.getMonth() + 1}.${dateStr.getFullYear()}`;
    } else {
        str = String(dateStr);
    }

    const parts = str.split('.');
    return parts.length === 3 ? parseInt(parts[2], 10) : NaN;
  }

  updateChartData(): void {
    this.updateAlterChart();
    this.updateTauglichkeitChart();
    this.updateUntersuchungChart();
  }

  private triggerAllChartsUpdate() {
    this.cd.detectChanges();
    queueMicrotask(() => this.charts?.forEach(c => c.update()));
  }

  private setActiveSortForTab(tabIndex: number): void {
    const sortIdx = this.sortIndexByTab[tabIndex];
    const activeSort = sortIdx !== undefined ? this.sorts?.get(sortIdx) : undefined;
    this.dataSource.sort = (activeSort as MatSort | undefined) ?? (undefined as any);
  }

  updateAlterChart(): void {
    const zaehler = [0, 0, 0, 0];

    this.atstraeger.forEach(traeger => {
      const alter = this.berechneAlter(traeger.geburtsdatum);
      if (alter >= 16 && alter <= 18) zaehler[0]++;
      else if (alter >= 19 && alter <= 39) zaehler[1]++;
      else if (alter >= 40 && alter <= 54) zaehler[2]++;
      else if (alter >= 55 && alter <= 65) zaehler[3]++;
    });

    this.chartAlter.datasets[0].data = zaehler;
    this.triggerAllChartsUpdate();
  }

  updateTauglichkeitChart(): void {
    const zaehler = [0, 0, 0];
    const currentYear = new Date().getFullYear();

    this.atstraeger.forEach(traeger => {
      if (traeger.tauglichkeit === 'tauglich') zaehler[0]++;
      else if (
        Number(traeger.naechste_untersuchung) <= currentYear ||
        traeger.naechste_untersuchung === null
      ) zaehler[2]++;
      else if (
        this.isOlderThanOneYear(traeger.leistungstest) === true ||
        traeger.leistungstest === 'nein'
      ) zaehler[1]++;
    });

    this.chartTauglichkeit.datasets[0].data = zaehler;
    this.triggerAllChartsUpdate();
  }

  updateUntersuchungChart(): void {
    const zaehler = [0, 0];
    const currentYear = new Date().getFullYear();

    this.atstraeger.forEach(traeger => {
      const nextStudy = Number(traeger.naechste_untersuchung);
      if (nextStudy <= currentYear || traeger.naechste_untersuchung === null) zaehler[0]++;
      else if (nextStudy > currentYear) zaehler[1]++;
    });

    this.chartUntersuchung.datasets[0].data = zaehler;
    this.triggerAllChartsUpdate();
  }

  private updateFilterPredicateFor(tabIndex: number) {
    const cols = this.columnsByTab[tabIndex] ?? [];
    if (!cols.length) {
      // Übersicht: alles durchlassen (oder leer)
      this.dataSource.filterPredicate = () => true;
      return;
    }
    this.dataSource.filterPredicate = (row: any, filter: string) => {
      const haystack = cols.map(c => String(row?.[c] ?? '').toLowerCase()).join(' ');
      return haystack.includes(filter);
    };
  }

  onTabChange(index: number): void {
    this.activeTabIndex = index;

    this.cd.detectChanges();
    queueMicrotask(() => {
      if (this.hasTable(index)) {
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
          this.paginator.firstPage();
        }
        this.setActiveSortForTab(index);
        this.updateFilterPredicateFor(index);
        this.dataSource.filter = this.dataSource.filter;
      } else {
        this.dataSource.paginator = undefined as any;
        this.dataSource.sort = undefined as any;
      }
    });
  }
}
