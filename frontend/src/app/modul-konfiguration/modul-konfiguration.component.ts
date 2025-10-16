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
import {
  MatFormField,
  MatLabel,
  MatError
} from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';

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
  modulListe: any = [];

  formAuswahl = new FormGroup({
    modul: new FormControl(0)
  });

  formModul = new FormGroup({
    id: new FormControl(0),
    modul: new FormControl('', Validators.required),
    konfiguration: new FormControl('', [
      Validators.required,
      this.validJson()
    ])
  });

  ngOnInit(): void {
    sessionStorage.setItem('PageNumber', '2');
    sessionStorage.setItem('Page2', 'V_MK');
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();
    this.formModul.disable();

    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
          this.modulListe = erg.data.main;
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
    this.setzeSelectZurueck();
  }

  setzeSelectZurueck(): void {
    this.formAuswahl.controls["modul"].setValue(0, { onlySelf: true });
  }

  auswahlBearbeiten(): void {
    const id = this.formAuswahl.controls['modul'].value;
    if (id === 0) {
      return;
    }
    const abfrageUrl = `${this.modul}/${id}`;

    this.globalDataService.get(abfrageUrl).subscribe({
      next: (erg: any) => {
        try {
          const details: any = erg.data["modul-konfiguration"] ?? {};
          this.formModul.enable();

          this.formModul.setValue({
            id: details.id,
            modul: details.modul,
            konfiguration: JSON.stringify(details.konfiguration, null, 2)
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
    objekt.konfiguration = JSON.parse(objekt.konfiguration);
    const idValue = this.formModul.controls['id'].value;

    if (!idValue) {
      this.globalDataService.post(this.modul, objekt, false).subscribe({
        next: (erg: any) => {
          try {
            this.formModul.reset();
            this.formModul.disable();
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
        next: (erg: any) => {
          try {  
            this.formModul.reset();
            this.formModul.disable();
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
      next: (erg: any) => {
        try {
          this.modulListe = this.modulListe.filter((m: any) => m.id !== id);
  
          this.formModul.reset();
          this.formModul.disable();
          this.setzeSelectZurueck();
  
          this.globalDataService.erstelleMessage('success', 'Modul Konfiguration erfolgreich gelöscht!');
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
    this.formModul.reset();
    this.formModul.disable();
    this.formAuswahl.reset();
  }

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
