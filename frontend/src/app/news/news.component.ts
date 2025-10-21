import { ViewChild, ElementRef, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { INews } from 'src/app/_interface/news';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { NgStyle } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { HeaderComponent } from '../_template/header/header.component';
import { FormatService } from '../helpers/format.service';

@Component({
    selector: 'app-news',
    imports: [HeaderComponent,MatCardModule, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatSelect, MatOption, MatButton, MatInputModule, MatError, NgStyle, MatAutocompleteModule],
    templateUrl: './news.component.html',
    styleUrl: './news.component.sass'
})
export class NewsComponent implements OnInit {
  @ViewChild('fotoUpload', { static: false }) fotoRef!: ElementRef<HTMLInputElement>;

  globalDataService = inject(GlobalDataService);
  formatService = inject(FormatService);
  router = inject(Router);

  title: string = "News Verwaltung";
  modul: string = "news/intern";
  breadcrumb: any[] = [];

  newsArray: any[] = [];
  foto: HTMLInputElement = <HTMLInputElement>document.getElementById("fotoUpload");
  btnText: string = "Bild auswählen";
  fileName: string = "";
  filePfad: string = "";
  fileFound: boolean = false;
  btnUploadStatus: boolean = false;

  formAuswahl = new FormGroup({
    news: new FormControl(0)
  });

  formModul = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    foto_url: new FormControl('')
  });

  ngOnInit(): void {
    sessionStorage.setItem('PageNumber', '2');
    sessionStorage.setItem('Page2', 'NEWS');
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();
    this.formModul.disable();
    this.foto = <HTMLInputElement>document.getElementById("fotoUpload");

    this.globalDataService.get(this.modul).subscribe({
      next: (erg: any) => {
        try {
          this.newsArray = this.convertNewsDate(erg);
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  private getSelectedFile(): File | null {
    const el = this.fotoRef?.nativeElement;
    return el?.files && el.files.length ? el.files[0] : null;
  }

  convertNewsDate(data: any): any[] {
    for (let i = 0; i < data.length; i++) {
      let created_at = data[i].created_at.split('T');
      let created_at_date = created_at[0];
      let created_at_time = created_at[1].split(':');
      data[i].created_at = created_at_date + '_' + created_at_time[0] + ':' + created_at_time[1];

      let updated_at = data[i].updated_at.split('T');
      let updated_at_date = updated_at[0];
      let updated_at_time = updated_at[1].split(':');
      data[i].updated_at = updated_at_date + '_' + updated_at_time[0] + ':' + updated_at_time[1];
    }
    return data;
  }

  setzeSelectZurueck(): void {
    this.formAuswahl.controls["news"].setValue(0, { onlySelf: true });
  }

  datenLoeschen(): void {
    let id = this.formModul.controls["id"].value!;

    this.globalDataService.delete(this.modul, id).subscribe({
      next: (erg: any) => {
        try {
          let data = this.newsArray;
          let dataNew: any[] = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].id !== id) {
              dataNew.push(data[i]);
            }
          }
          this.newsArray = dataNew;
          this.formModul.reset({ title: '', text: '', foto_url: '' });
          this.foto.disabled = true;
          this.btnText = "Bild auswählen";
          this.fileName = "";
          this.filePfad = "";
          this.fileFound = false;
          this.btnUploadStatus = false;
          this.formModul.disable();
          this.setzeSelectZurueck();
          this.globalDataService.erstelleMessage("success","News erfolgreich gelöscht!");
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  auswahlBearbeiten(): void {
    let id = this.formAuswahl.controls["news"].value;
    if (id == 0) {
      return;
    }
    let abfrageUrl = this.modul + "/" + id;

    this.globalDataService.get(abfrageUrl).subscribe({
      next: (erg: any) => {
        try {
          let details: INews = erg;
          this.formModul.enable();
          this.btnUploadStatus = true;

          if (details.foto_url) {
            this.btnText = "Bild ersetzen";
            let filePfadSplit: any = details.foto_url.split("/");
            this.fileName = filePfadSplit[filePfadSplit.length - 1];
            this.fileFound = true;
            this.filePfad = details.foto_url;
          }

          this.formModul.setValue({
            id: details.id,
            title: details.title,
            text: details.text,
            foto_url: ''
          });
          this.setzeSelectZurueck();
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  abbrechen(): void {
    this.globalDataService.erstelleMessage("info", "News nicht gespeichert!");
    this.router.navigate(['/news']);
  }

  neueDetails(): void {
    this.formModul.enable();
    this.btnUploadStatus = true;
    this.setzeSelectZurueck();
  }

  datenSpeichern(): void {
    const idValue = this.formModul.controls['id'].value;
    const title = this.formModul.controls['title'].value!;
    const text  = this.formModul.controls['text'].value!;
    const file  = this.getSelectedFile();

    if (!idValue) {
      // CREATE
      if (file) {
        const fd = new FormData();
        fd.append('title', title);
        fd.append('text', text);
        fd.append('foto', file, file.name || 'upload.png');
        this.globalDataService.post(this.modul, fd, true).subscribe({
          next: (erg: any) => {
            try {
              this.newsArray.push(erg);
              this.formModul.reset({ title: '', text: '', foto_url: '' });
              this.foto.disabled = true;
              this.btnText = "Bild auswählen";
              this.fileName = "";
              this.filePfad = "";
              this.fileFound = false;
              this.formModul.disable();
              this.btnUploadStatus = false;
              this.setzeSelectZurueck();
              this.globalDataService.erstelleMessage("success","News erfolgreich gespeichert!");
            } catch (e: any) {
              this.globalDataService.erstelleMessage("error", e);
            }
          },
          error: (error: any) => {
            this.globalDataService.errorAnzeigen(error);
          }
        });
      } else {
        // JSON – KEIN foto_url mitsenden
        this.globalDataService.post(this.modul, { title, text }, false).subscribe({
          next: (erg: any) => {
            try {
              this.newsArray.push(erg);
              this.formModul.reset({ title: '', text: '', foto_url: '' });
              this.foto.disabled = true;
              this.btnText = "Bild auswählen";
              this.fileName = "";
              this.filePfad = "";
              this.fileFound = false;
              this.formModul.disable();
              this.btnUploadStatus = false;
              this.setzeSelectZurueck();
              this.globalDataService.erstelleMessage("success","News erfolgreich gespeichert!");
            } catch (e: any) {
              this.globalDataService.erstelleMessage("error", e);
            }
          },
          error: (error: any) => {
            this.globalDataService.errorAnzeigen(error);
          }
        });
      }
    } else {
      // UPDATE
      if (file) {
        const fd = new FormData();
        fd.append('title', title);
        fd.append('text', text);
        fd.append('foto', file, file.name || 'upload.png');
        this.globalDataService.patch(this.modul, idValue, fd, true).subscribe({
        next: (erg: any) => {
          try {
            let data = this.newsArray;
            let dataNew: any[] = [];
            for (let i = 0; i < data.length; i++) {
              if (data[i].id == erg.id) {
                dataNew.push(erg);
              } else {
                dataNew.push(data[i]);
              }
            }
            this.newsArray = dataNew;
            this.formModul.reset({ title: '', text: '', foto_url: '' });
            this.btnText = "Bild auswählen";
            this.fileName = "";
            this.filePfad = "";
            this.fileFound = false;
            this.formModul.disable();
            this.btnUploadStatus = false;
            this.setzeSelectZurueck();
            this.globalDataService.erstelleMessage("success","News erfolgreich geändert!");
          } catch (e: any) {
            this.globalDataService.erstelleMessage("error", e);
          }
        },
        error: (error: any) => {
          this.globalDataService.errorAnzeigen(error);
        }
      });
      } else {
        // nur Text/Titel
        this.globalDataService.patch(this.modul, idValue, { title, text }, false).subscribe({
        next: (erg: any) => {
          try {
            let data = this.newsArray;
            let dataNew: any[] = [];
            for (let i = 0; i < data.length; i++) {
              if (data[i].id == erg.id) {
                dataNew.push(erg);
              } else {
                dataNew.push(data[i]);
              }
            }
            this.newsArray = dataNew;
            this.formModul.reset({ title: '', text: '', foto_url: '' });
            this.btnText = "Bild auswählen";
            this.fileName = "";
            this.filePfad = "";
            this.fileFound = false;
            this.formModul.disable();
            this.btnUploadStatus = false;
            this.setzeSelectZurueck();
            this.globalDataService.erstelleMessage("success","News erfolgreich geändert!");
          } catch (e: any) {
            this.globalDataService.erstelleMessage("error", e);
          }
        },
        error: (error: any) => {
          this.globalDataService.errorAnzeigen(error);
        }
      });
      }
    }
  }

  onFotoSelected(event: Event): void {
    const file = this.getSelectedFile();
    if (!file) { this.fileFound = false; this.fileName = ''; return; }
    const sizeKB = Math.round(file.size / 1024);
    if (sizeKB >= this.globalDataService.MaxUploadSize) {
      this.fileFound = false;
      this.fileName = '';
      const maxMB = this.globalDataService.MaxUploadSize / 1024;
      this.globalDataService.erstelleMessage("error", `Foto darf nicht größer als ${maxMB}MB sein!`);
    } else {
      this.fileFound = true;
      this.fileName = file.name;
    }
  }

  openModal(): void {
    var modal: any = document.getElementById("myModal")!;
    modal.style.display = "block";
  }

  closeModal(): void {
    var modal: any = document.getElementById("myModal")!;
    modal.style.display = "none";
  }

  newsfeedOeffnen(): void {
    window.open('https://blaulichtcloud.at/newsfeed', '_blank');
  }
}
