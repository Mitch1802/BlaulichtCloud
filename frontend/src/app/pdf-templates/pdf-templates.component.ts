import {
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { HeaderComponent } from '../_template/header/header.component';
import { FormatService } from '../helpers/format.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { IPdfTemplate } from '../_interface/pdf_template';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-pdf-templates',
  imports: [
    HeaderComponent,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatButton,
    MatInputModule,
    MatError,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIcon
  ],
  templateUrl: './pdf-templates.component.html',
  styleUrl: './pdf-templates.component.sass'
})
export class PdfTemplatesComponent implements OnInit {

  globalDataService = inject(GlobalDataService);
  formatService = inject(FormatService);
  router = inject(Router);

  title = 'PDF Templates';
  modul = 'pdf/templates';

  typModul = [
    'ATEMSCHUTZ',
    'FMD',
    'INVENTAR',
    'VERWALTUNG',
  ]

  pdfTemplateArray: IPdfTemplate[] = [];
  breadcrumb: any = [];
  dataSource = new MatTableDataSource<IPdfTemplate>(this.pdfTemplateArray);
  sichtbareSpalten: string[] = ['typ', 'version', 'bezeichnung', 'status', 'actions'];

  formModul = new FormGroup({
    id: new FormControl<string | ''>(''),
    typ: new FormControl<string>('', Validators.required),
    version: new FormControl<number>(0),
    bezeichnung: new FormControl<string>('', Validators.required),
    status: new FormControl<string>(''),
    source: new FormControl<string>('', Validators.required),
  });

  ngOnInit(): void {
    sessionStorage.setItem('PageNumber', '2');
    sessionStorage.setItem('Page2', 'PDF');
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();

    this.formModul.disable();

    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
          this.pdfTemplateArray = this.convertNewsDate(erg) as IPdfTemplate[];
          this.dataSource.data = this.pdfTemplateArray;
        } catch (e: any) {
          this.globalDataService.erstelleMessage('error', e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  convertNewsDate(data: any): any[] {
    for (let i = 0; i < data.length; i++) {
      const published_at = String(data[i].updated_at).split('T');
      const published_at_date = published_at[0];
      const published_at_time = published_at[1]?.split(':') ?? [];
      data[i].published_at = published_at_date + '_' + published_at_time[0] + ':' + published_at_time[1];

      const created_at = String(data[i].created_at).split('T');
      const created_at_date = created_at[0];
      const created_at_time = created_at[1]?.split(':') ?? [];
      data[i].created_at = created_at_date + '_' + created_at_time[0] + ':' + created_at_time[1];

      const updated_at = String(data[i].updated_at).split('T');
      const updated_at_date = updated_at[0];
      const updated_at_time = updated_at[1]?.split(':') ?? [];
      data[i].updated_at = updated_at_date + '_' + updated_at_time[0] + ':' + updated_at_time[1];
    }
    return data;
  }

  datenLoeschen(): void {
    const id = this.formModul.controls['id'].value!;
    this.globalDataService.delete(this.modul, id).subscribe({
      next: (erg: any) => {
        try {
          this.pdfTemplateArray = this.pdfTemplateArray.filter(n => n.id !== id);
          this.dataSource.data = this.pdfTemplateArray;
          this.resetFormNachAktion();
          this.globalDataService.erstelleMessage('success', 'Inventar erfolgreich gelöscht!');
        } catch (e: any) {
          this.globalDataService.erstelleMessage('error', e);
        }
      },
      error: (error: any) => this.globalDataService.errorAnzeigen(error)
    });
  }

  auswahlBearbeiten(element: any): void {
    if (element.id === 0) {
      return;
    }
    const abfrageUrl = `${this.modul}/${element.id}`;
    this.globalDataService.get(abfrageUrl).subscribe({
      next: (erg: any) => {
        try {
          let details: IPdfTemplate = erg;
          this.formModul.enable();
          this.formModul.setValue({
            id: details.id!,
            typ: details.typ,
            version: details.version,
            bezeichnung: details.bezeichnung,
            status: details.status,
            source: details.source,
          });
        } catch (e: any) {
          this.globalDataService.erstelleMessage('error', e);
        }
      },
      error: (error: any) => this.globalDataService.errorAnzeigen(error)
    });
  }

  publish(): void {

  }

  newVersion(): void {

  }

  test(element: any): void {
    if (!element?.id) return; // UUID, kein 0-check

    const abfrageUrl = `${this.modul}/${element.id}/test`;

    this.globalDataService.postBlob(abfrageUrl, {}).subscribe({
      next: (blob: Blob) => {
        // optional: sicherstellen, dass es wirklich ein PDF ist
        if (blob.type && blob.type !== 'application/pdf') {
          this.globalDataService.erstelleMessage('error', `Unerwarteter Content-Type: ${blob.type}`);
          return;
        }

        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');

        // optional später:
        // setTimeout(() => URL.revokeObjectURL(url), 60_000);
      },
      error: (error: any) => this.globalDataService.errorAnzeigen(error)
    });
  }



  abbrechen(): void {
    this.globalDataService.erstelleMessage('info', 'Pdf Template nicht gespeichert!');
    this.router.navigate(['/pdf_template']);
  }

  neueDetails(): void {
    this.formModul.enable();
    this.formModul.patchValue({ id: '', typ: '', version: 1, bezeichnung: '', status: 'DRAFT', source: '' });
  }

  datenSpeichern(): void {
    const idValue = this.formModul.controls['id'].value || '';
    const typ = this.formModul.controls['typ'].value!;
    const version = this.formModul.controls['version'].value!;
    const bezeichnung = this.formModul.controls['bezeichnung'].value!;
    const status = this.formModul.controls['status'].value!;
    const source = this.formModul.controls['source'].value!;

    if (!idValue) {
      this.globalDataService.post(this.modul, { typ, version, bezeichnung, status, source }, false).subscribe({
        next: (erg: any) => {
          try {
            const newMask: IPdfTemplate = erg;
            this.pdfTemplateArray.push(newMask);
            this.pdfTemplateArray = this.globalDataService.arraySortByKey(this.pdfTemplateArray, 'typ');
            this.dataSource.data = this.pdfTemplateArray;
            this.resetFormNachAktion();
            this.globalDataService.erstelleMessage('success', 'Pdf Template erfolgreich gespeichert!');
          } catch (e: any) {
            this.globalDataService.erstelleMessage('error', e);
          }
        },
        error: (error: any) => this.globalDataService.errorAnzeigen(error)
      });

    } else {
      this.globalDataService.patch(this.modul, idValue, { typ, version, bezeichnung, status, source }, false).subscribe({
        next: (erg: any) => {
          try {
            const updated: any = erg;
            this.pdfTemplateArray = this.pdfTemplateArray
              .map(m => m.id === updated.id ? updated : m)
              .sort((a, b) => a.typ - b.typ);

            this.dataSource.data = this.pdfTemplateArray;
            this.resetFormNachAktion();
            this.globalDataService.erstelleMessage('success', 'Pdf Template erfolgreich geändert!');
          } catch (e: any) {
            this.globalDataService.erstelleMessage('error', e);
          }
        },
        error: (error: any) => this.globalDataService.errorAnzeigen(error)
      });
    }
  }

  private resetFormNachAktion(): void {
    this.formModul.reset({ id: '', typ: '', version: 0, bezeichnung: '', status: '', source: '' });
    this.formModul.disable();
  }
}
