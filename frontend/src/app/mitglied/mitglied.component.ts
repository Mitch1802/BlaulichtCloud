import { Component, OnInit, inject } from '@angular/core';
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
      MatHint
  ],
  templateUrl: './mitglied.component.html',
  styleUrl: './mitglied.component.sass'
})
export class MitgliedComponent implements OnInit {
  globalDataService = inject(GlobalDataService);
  router = inject(Router);

  title = "Mitglieder Verwaltung";
  modul = "mitglieder";

  mitglieder: IMitglied[] = [];
  breadcrumb: any = [];

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
  });

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "2");
    sessionStorage.setItem("Page2", "V_M");
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();
    this.formModul.disable();

    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
          this.mitglieder = erg.data.main;
          this.mitglieder = this.globalDataService.arraySortByKey(this.mitglieder, 'stbnr');
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  private validDateDDMMYYYY(): ValidatorFn {
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

  setzeSelectZurueck(): void {
    this.formAuswahl.controls["mitglied"].setValue(0, { onlySelf: true });
  }

  auswahlBearbeiten(): void {
    const id = this.formAuswahl.controls['mitglied'].value;
    if (id === 0) {
      return;
    }
    const abfrageUrl = `${this.modul}/${id}`;
  
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
            geburtsdatum: details.geburtsdatum ?? ''
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
  

  neueDetails(): void {
    this.formModul.enable();
    this.setzeSelectZurueck();
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
  
          this.formModul.reset({
            id: 0,
            stbnr: '',
            vorname: '',
            nachname: '',
            svnr: '',
            geburtsdatum: ''
          });
          this.formModul.disable();
          this.setzeSelectZurueck();
  
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
    this.router.navigate(['/mitglied']);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/mitglied']);
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
  
            this.formModul.reset({
              id: 0,
              stbnr: '',
              vorname: '',
              nachname: '',
              svnr: '',
              geburtsdatum: ''
            });
            this.formModul.disable();
            this.setzeSelectZurueck();
  
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
  
            this.formModul.reset({
              id: 0,
              stbnr: '',
              vorname: '',
              nachname: '',
              svnr: '',
              geburtsdatum: ''
            });
            this.formModul.disable();
            this.setzeSelectZurueck();
  
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
