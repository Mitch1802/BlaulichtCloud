import { Component, inject, OnInit } from '@angular/core';
import { GlobalDataService } from '../_service/global-data.service';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../_template/header/header.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IStammdaten } from '../_interface/stammdaten';
import { IRechnung } from '../_interface/verwaltung';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

type RechnungPosition = { bezeichnung: string; preis: string };

@Component({
  selector: 'app-verwaltung',
  imports: [
    HeaderComponent,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './verwaltung.component.html',
  styleUrl: './verwaltung.component.sass'
})
export class VerwaltungComponent implements OnInit {
  globalDataService = inject(GlobalDataService);

  title = 'Verwaltung';
  modul = 'verwaltung';

  breadcrumb: any = [];
  pdf_konfig: any = {};
  stammdaten: any = {};

  formRechnung = new FormGroup({
    adress_name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    adresse_strasse: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    adresse_plz: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    adresse_ort: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    betreff: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    anrede: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    text: new FormControl('', { nonNullable: true, validators: [Validators.required] }),

    positionen: new FormControl<RechnungPosition[]>([], { nonNullable: true, validators: [Validators.required] }),
  });


  formRechnungPositionen = new FormGroup({
    bezeichnung: new FormControl(''),
    preis: new FormControl('')
  })

  ngOnInit(): void {
    sessionStorage.setItem('PageNumber', '2');
    sessionStorage.setItem('Page2', 'VER');
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();

    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
          const templates = erg.modul_konfig.find((m: any) => m.modul === 'pdf');
          this.pdf_konfig = templates?.konfiguration ?? [];
          this.stammdaten = <IStammdaten>erg.konfig[0];
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  printRechnung(): void {
    const idVerwaltungRechnung = this.pdf_konfig['idVerwaltungRechnung'];
    const abfrageUrl = `pdf/templates/${idVerwaltungRechnung}/render`;

    let heute: any = new Date().toLocaleString('de-DE');
    heute = heute.split(",");
    heute = heute[0];

    let betrag_total = 0
    let pos = this.formRechnung.controls.positionen.value;
    for (let i = 0; i < pos.length; i++) {
      betrag_total += Number(pos[i].preis);
      pos[i].preis = Number(pos[i].preis).toFixed(2);
    }

    const payload = {
      "fw_name": this.stammdaten.fw_name,
      "fw_nummer": this.stammdaten.fw_nummer,
      "fw_street": this.stammdaten.fw_street,
      "fw_plz": this.stammdaten.fw_plz,
      "fw_ort": this.stammdaten.fw_ort,
      "fw_email": this.stammdaten.fw_email,
      "fw_telefon": this.stammdaten.fw_telefon,
      "fw_konto": this.stammdaten.fw_konto,
      "fw_iban": this.stammdaten.fw_iban,
      "fw_bic": this.stammdaten.fw_bic,
      "fw_kdt": this.stammdaten.fw_kdt,
      "invoice_datum": heute,
      "customer_name": this.formRechnung.controls.adress_name.value,
      "customer_street": this.formRechnung.controls.adresse_strasse.value,
      "customer_plz": this.formRechnung.controls.adresse_plz.value,
      "customer_ort": this.formRechnung.controls.adresse_ort.value,
      "invoice_betreff": this.formRechnung.controls.betreff.value,
      "invoice_anrede": this.formRechnung.controls.anrede.value,
      "invoice_text": this.formRechnung.controls.text.value,
      "invoice_items": this.formRechnung.controls.positionen.value,
      "invoice_total_betrag": betrag_total.toFixed(2)
    }

    this.globalDataService.postBlob(abfrageUrl, payload).subscribe({
      next: (blob: Blob) => {
        if (blob.size === 0) {
          this.globalDataService.erstelleMessage('error', 'PDF ist leer (0 Bytes).');
          return;
        }

        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      error: (error: any) => this.globalDataService.errorAnzeigen(error)
    });
  }

  formRechnungReset(): void {
    this.formRechnung.reset({
      adress_name: '',
      adresse_strasse: '',
      adresse_plz: '',
      adresse_ort: '',
      betreff: '',
      anrede: '',
      text: '',
      positionen: []
    })
  }

  addPosition(): void {
    const bezeichnung = this.formRechnungPositionen.controls.bezeichnung.value?.trim() ?? '';
    const preis = this.formRechnungPositionen.controls.preis.value?.trim() ?? '';

    if (!bezeichnung || !preis) return;

    const current = this.formRechnung.controls.positionen.value; // jetzt sicher RechnungPosition[]
    const next = [...current, { bezeichnung, preis }];

    this.formRechnung.controls.positionen.setValue(next);
    this.formRechnung.controls.positionen.markAsDirty();
    this.formRechnungPositionen.reset({ bezeichnung: '', preis: '' });
  }

  removePosition(index: number): void {
    const current = this.formRechnung.controls.positionen.value; // RechnungPosition[]
    if (index < 0 || index >= current.length) return;

    const next = current.filter((_, i) => i !== index);
    this.formRechnung.controls.positionen.setValue(next);
    this.formRechnung.controls.positionen.markAsDirty();
    this.formRechnung.controls.positionen.updateValueAndValidity();
  }

}