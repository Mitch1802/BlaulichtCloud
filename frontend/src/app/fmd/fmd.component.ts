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
        MatTableModule
  ],
  templateUrl: './fmd.component.html',
  styleUrl: './fmd.component.sass'
})
export class FmdComponent implements OnInit {
  globalDataService = inject(GlobalDataService);
  router = inject(Router);

  title: string = "FMD";
  modul: string = "fmd";

  mitglieder: IMitglied[] = [];
  atstraeger: IATSTraeger[] = [];
  breadcrumb: any = [];

  sichtbareSpaltenUntersuchung: string[] = ['stbnr', 'vorname', 'nachname', 'letzte_untersuchung', 'naechste_untersuchung'];
  sichtbareSpaltenFinnentest: string[] = ['stbnr', 'vorname', 'nachname', 'leistungstest'];
  sichtbareSpaltenTauglichkeit: string[] = ['stbnr', 'vorname', 'nachname', 'tauglichkeit'];

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
    naechste_untersuchung: new FormControl(''),
    tauglichkeit: new FormControl(''),
    notizen: new FormControl(''),
    fdisk_aenderung: new FormControl('', [
      Validators.pattern(/^([0-3]\d)\.([0-1]\d)\.(\d{4})$/),
      this.validDateDDMMYYYY()
    ]),
  });

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "2");
    sessionStorage.setItem("Page2", "FMD");
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();
    this.formModul.disable();

    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
          const mains = erg.data.main as any[];
          this.mitglieder = erg.data.mitglieder as any[];

          const memberMap = new Map<number, any>(
            this.mitglieder.map((m: any) => [m.pkid, m])
          );

          this.atstraeger = mains.map(item => {
            const mitg = memberMap.get(item.mitglied_id) || {};
            return {
              ...item,
              stbnr:    mitg.stbnr,
              vorname:  mitg.vorname,
              nachname: mitg.nachname
            };
          });

          this.mitglieder = this.globalDataService.arraySortByKey(this.mitglieder, 'stbnr');
          this.atstraeger = this.globalDataService.arraySortByKey(this.atstraeger, 'stbnr');
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
            naechste_untersuchung: details.naechste_untersuchung,
            tauglichkeit: details.tauglichkeit,
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

    if (!idValue) {
      this.globalDataService.post(this.modul, objekt, false).subscribe({
        next: (erg: any) => {
          try {
            this.formModul.reset({
              id: 0,
              mitglied_id: '',
              hausarzt: '',
              letzte_untersuchung: '',
              leistungstest: '',
              naechste_untersuchung: '',
              tauglichkeit: '',
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
            this.formModul.reset();
            this.formModul.reset({
              id: 0,
              mitglied_id: '',
              hausarzt: '',
              letzte_untersuchung: '',
              leistungstest: '',
              naechste_untersuchung: '',
              tauglichkeit: '',
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
            naechste_untersuchung: '',
            tauglichkeit: '',
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
}
