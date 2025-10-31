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
import { IAtemschutzGeraete } from 'src/app/_interface/atemschutz_geraete';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app--atemschutzgeraete',
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
  templateUrl: './atemschutz-geraete.component.html',
  styleUrl: './atemschutz-geraete.component.sass'
})
export class AtemschutzGeraeteComponent implements OnInit {
  globalDataService = inject(GlobalDataService);

  title = "Geräte";
  modul = "atemschutz/geraete";

  geraete: IAtemschutzGeraete[] = [];
  breadcrumb: any = [];
  dataSource = new MatTableDataSource<IAtemschutzGeraete>(this.geraete);
  sichtbareSpalten: string[] = ['inv_nr', 'bezeichnung', 'typ', 'actions'];

  formModul = new FormGroup({
    id: new FormControl(''),
    inv_nr: new FormControl(''),
    bezeichnung: new FormControl(''),
    art: new FormControl(''),
    typ: new FormControl(''),
    druckminderer: new FormControl(''),
    lungenautomat: new FormControl(''),
    rahmen_nr: new FormControl(''),
    eigentuemer: new FormControl(''),
    barcode: new FormControl(''),
    standort: new FormControl(''),
    baujahr: new FormControl(''),
    datum_im_dienst: new FormControl(''),
    naechste_gue: new FormControl('')
  });

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "3");
    sessionStorage.setItem("Page3", "ATM_G");
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
          const details: IAtemschutzGeraete = erg;

          this.formModul.enable();
          this.formModul.setValue({
            id: details.id,
            inv_nr: details.inv_nr,
            bezeichnung: details.bezeichnung,
            art: details.art,
            typ: details.typ,
            druckminderer: details.druckminderer,
            lungenautomat: details.lungenautomat,
            rahmen_nr: details.rahmen_nr,
            eigentuemer: details.eigentuemer,
            barcode: details.barcode,
            standort: details.standort,
            baujahr: details.baujahr,
            datum_im_dienst: details.datum_im_dienst,
            naechste_gue: details.naechste_gue
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
            const newMask: IAtemschutzGeraete = erg;

            this.geraete.push(newMask);
            this.geraete = this.globalDataService.arraySortByKey(this.geraete, 'inv_nr');
            this.dataSource.data = this.geraete;

            this.formModul.reset({
              id: '',
              inv_nr: '',
              bezeichnung: '',
              art: '',
              typ: '',
              druckminderer: '',
              lungenautomat: '',
              rahmen_nr: '',
              eigentuemer: '',
              barcode: '',
              standort: '',
              baujahr: '',
              datum_im_dienst: '',
              naechste_gue: ''
            });
            this.formModul.disable();
            this.globalDataService.erstelleMessage('success', 'Gerät gespeichert!');
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
            this.geraete = this.geraete
              .map(m => m.id === updated.id ? updated : m)
              .sort((a, b) => a.inv_nr - b.inv_nr);

            this.dataSource.data = this.geraete;

            this.formModul.reset({
              id: '',
              inv_nr: '',
              bezeichnung: '',
              art: '',
              typ: '',
              druckminderer: '',
              lungenautomat: '',
              rahmen_nr: '',
              eigentuemer: '',
              barcode: '',
              standort: '',
              baujahr: '',
              datum_im_dienst: '',
              naechste_gue: ''
            });
            this.formModul.disable();

            this.globalDataService.erstelleMessage('success', 'Gerät geändert!');
          } catch (e: any) {
            this.globalDataService.erstelleMessage('error', e);
          }
        },
        error: (error: any) => this.globalDataService.errorAnzeigen(error)
      });
    }
  }

  abbrechen(): void {
    this.globalDataService.erstelleMessage("info", "Gerät nicht gespeichert!");
    this.formModul.reset({
      id: '',
      inv_nr: '',
      bezeichnung: '',
      art: '',
      typ: '',
      druckminderer: '',
      lungenautomat: '',
      rahmen_nr: '',
      eigentuemer: '',
      barcode: '',
      standort: '',
      baujahr: '',
      datum_im_dienst: '',
      naechste_gue: ''
    });
    this.formModul.disable();
  }

  datenLoeschen(): void {
    const id = this.formModul.controls['id'].value!;
    if (!id) {
      this.globalDataService.erstelleMessage('error', 'Keine Gerät ausgewählt zum Löschen!');
      return;
    }

    this.globalDataService.delete(this.modul, id).subscribe({
      next: (erg: any) => {
        try {
          this.geraete = this.geraete.filter((m: any) => m.id !== id);
          this.dataSource.data = this.geraete;

          this.formModul.reset({
            id: '',
            inv_nr: '',
            bezeichnung: '',
            art: '',
            typ: '',
            druckminderer: '',
            lungenautomat: '',
            rahmen_nr: '',
            eigentuemer: '',
            barcode: '',
            standort: '',
            baujahr: '',
            datum_im_dienst: '',
            naechste_gue: ''
          });
          this.formModul.disable();

          this.globalDataService.erstelleMessage('success', 'Gerät erfolgreich gelöscht!');
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
