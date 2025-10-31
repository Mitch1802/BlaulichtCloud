import { Component, OnInit, inject } from '@angular/core';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IAtemschutzMasken } from 'src/app/_interface/atemschutz_masken';
import { MatIcon } from '@angular/material/icon';

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
    MatButton,
    MatInput,
    MatError,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIcon
  ],
  templateUrl: './atemschutz-masken.component.html',
  styleUrl: './atemschutz-masken.component.sass'
})
export class AtemschutzMaskenComponent implements OnInit {
  globalDataService = inject(GlobalDataService);

  title = "Masken";
  modul = "atemschutz/masken";

  masken: IAtemschutzMasken[] = [];
  breadcrumb: any = [];
  dataSource = new MatTableDataSource<IAtemschutzMasken>(this.masken);
  sichtbareSpalten: string[] = ['inv_nr', 'bezeichnung', 'typ', 'actions'];

  formModul = new FormGroup({
    id: new FormControl(''),
    inv_nr: new FormControl(''),
    bezeichnung: new FormControl(''),
    art: new FormControl(''),
    typ: new FormControl(''),
    eigentuemer: new FormControl(''),
    barcode: new FormControl(''),
    baujahr: new FormControl('')
  });

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "3");
    sessionStorage.setItem("Page3", "ATM_M");
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();
    this.formModul.disable();

    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
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
}
