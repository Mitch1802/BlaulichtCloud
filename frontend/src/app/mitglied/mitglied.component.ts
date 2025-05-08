import { AfterViewInit, Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { IMitglied } from 'src/app/_interface/mitglied';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { HeaderComponent } from '../_template/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel, MatError, MatHint } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-mitglied',
  standalone: true,
  imports: [
      CommonModule, 
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
      MatError, 
      MatCheckbox,
      MatHint,
      MatTableModule,
      MatPaginatorModule,
      MatIconModule
  ],
  templateUrl: './mitglied.component.html',
  styleUrl: './mitglied.component.sass'
})
export class MitgliedComponent implements OnInit, AfterViewInit {
  globalDataService = inject(GlobalDataService);
  router = inject(Router);
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  title = "Mitglieder Verwaltung";
  modul = "mitglieder";

  mitglieder: IMitglied[] = [];
  breadcrumb: any = [];
  dataSource = new MatTableDataSource<IMitglied>(this.mitglieder);

  formAuswahl = new FormGroup({
    mitglied: new FormControl(0)
  });

  formModul = new FormGroup({
    id: new FormControl(0),
    stbnr: new FormControl('', Validators.required),
    vorname: new FormControl('', Validators.required),
    nachname: new FormControl('', Validators.required),
    svnr: new FormControl('', [
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.pattern(/^\d{4}$/)
    ]),
    geburtsdatum: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([0-3]\d)\.([0-1]\d)\.(\d{4})$/),
      this.validDateDDMMYYYY()
    ]),
    hauptberuflich: new FormControl(false)
  });

  sichtbareSpaltenMitglieder: string[] = ['stbnr', 'vorname', 'nachname', 'actions'];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "2");
    sessionStorage.setItem("Page2", "V_M");
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();
    this.formModul.disable();

    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
          this.mitglieder = this.globalDataService.arraySortByKey(erg.data.main, 'stbnr');
          this.dataSource.data = this.mitglieder;
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];

    Papa.parse<IMitglied>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        const parsed: IMitglied[] = results.data;

        // Filtere nur neue Einträge (z.B. anhand der ID)
        const toImport = parsed.filter(item =>
          !this.mitglieder.some(existing => existing.id === item.id)
        );

        if (toImport.length > 0) {
          this.sendToBackend(toImport);
        } else {
          console.log('Keine neuen Mitglieder zum Importieren.');
        }
      },
      error: (err: any) => console.error('CSV Parsing Error:', err)
    });
  }

  private sendToBackend(entries: IMitglied[]): void {
    let test = '';
    // this.http.post('/api/mitglieder/import', entries)
    //   .subscribe({
    //     next: () => console.log('Import erfolgreich'),
    //     error: (err) => console.error('Fehler beim Import:', err)
    //   });
  }

  private validDateDDMMYYYY(): ValidatorFn {
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

  auswahlBearbeiten(element: any): void {
    if (element.id === 0) {
      return;
    }
    const abfrageUrl = `${this.modul}/${element.id}`;
  
    this.globalDataService.get(abfrageUrl).subscribe({
      next: (erg: any) => {
        try {
          const details: IMitglied = erg.data.mitglied; 
  
          this.formModul.enable();
          this.formModul.setValue({
            id: details.id,
            stbnr: details.stbnr,
            vorname: details.vorname,
            nachname: details.nachname,
            svnr: details.svnr ?? '',
            geburtsdatum: details.geburtsdatum ?? '',
            hauptberuflich: details.hauptberuflich ?? false
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
  

  neueDetails(): void {
    this.formModul.enable();
  }

  datenLoeschen(): void {
    const id = this.formModul.controls['id'].value!;
    if (!id) {
      this.globalDataService.erstelleMessage('error', 'Kein Mitglied ausgewählt zum Löschen!');
      return;
    }
  
    this.globalDataService.delete(this.modul, id).subscribe({
      next: (erg: any) => {
        try {
          this.mitglieder = this.mitglieder.filter(m => m.id !== id);
          this.dataSource.data = this.mitglieder;
  
          this.formModul.reset({
            id: 0,
            stbnr: '',
            vorname: '',
            nachname: '',
            svnr: '',
            geburtsdatum: '',
            hauptberuflich: false
          });
          this.formModul.disable();
  
          this.globalDataService.erstelleMessage('success', 'Mitglied erfolgreich gelöscht!');
        } catch (e: any) {
          this.globalDataService.erstelleMessage('error', e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  abbrechen(): void {
    this.globalDataService.erstelleMessage("info", "Mitglied nicht gespeichert!");
    this.formModul.reset({
      id: 0,
      stbnr: '',
      vorname: '',
      nachname: '',
      svnr: '',
      geburtsdatum: '',
      hauptberuflich: false
    });
    this.formModul.disable();
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
            this.mitglieder.push(erg.data);
            this.mitglieder = this.globalDataService.arraySortByKey(this.mitglieder, 'stbnr');
            this.dataSource.data = this.mitglieder;
  
            this.formModul.reset({
              id: 0,
              stbnr: '',
              vorname: '',
              nachname: '',
              svnr: '',
              geburtsdatum: '',
              hauptberuflich: false
            });
            this.formModul.disable();
  
            this.globalDataService.erstelleMessage('success', 'Mitglied erfolgreich gespeichert!');
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
            this.mitglieder = this.mitglieder.map(m =>
              m.id === erg.data.id ? erg.data : m
            );
            this.dataSource.data = this.mitglieder;
  
            this.formModul.reset({
              id: 0,
              stbnr: '',
              vorname: '',
              nachname: '',
              svnr: '',
              geburtsdatum: '',
              hauptberuflich: false
            });
            this.formModul.disable();
  
            this.globalDataService.erstelleMessage('success', 'Mitglied erfolgreich geändert!');
          } catch (e: any) {
            this.globalDataService.erstelleMessage('error', e);
          }
        },
        error: (error: any) => this.globalDataService.errorAnzeigen(error)
      });
    }
  }
}
