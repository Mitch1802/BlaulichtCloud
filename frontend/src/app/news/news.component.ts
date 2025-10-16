import { Component, OnInit, inject } from '@angular/core';
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

@Component({
    selector: 'app-news',
    imports: [HeaderComponent,MatCardModule, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatSelect, MatOption, MatButton, MatInputModule, MatError, NgStyle, MatAutocompleteModule],
    templateUrl: './news.component.html',
    styleUrl: './news.component.sass'
})
export class NewsComponent implements OnInit {
  globalDataService = inject(GlobalDataService);
  router = inject(Router);

  title: string = "News Verwaltung";
  modul: string = "news/intern";
  breadcrumb: any[] = [];

  newsArray: INews[] = [];
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
          this.newsArray = erg.main;
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
          let details: INews = erg.news;
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
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/news']);
  }

  neueDetails(): void {
    this.formModul.enable();
    this.btnUploadStatus = true;
    this.setzeSelectZurueck();
  }

  datenSpeichern(): void {
    let idValue = this.formModul.controls["id"].value;
    let object: any = this.formModul.value;
    let filesVorhanden: boolean = false;
    let daten;

    let formData = new FormData();
    formData.append('title', this.formModul.controls["title"].value!);
    formData.append('text', this.formModul.controls["text"].value!);

    if (this.foto.files != null) {
      if (this.foto.files.length > 0) {
        let f = this.foto.files[0];
        formData.append('foto', f);
        filesVorhanden = true;
      }
    }

    if (idValue === 0 || idValue === null) {
      if (filesVorhanden == true) {
        daten = formData;
      } else {
        daten = object;
        delete daten.foto;
      }

      this.globalDataService.post(this.modul, daten, filesVorhanden).subscribe({
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
      this.globalDataService.patch(this.modul, idValue, formData, true).subscribe({
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
            this.foto.disabled = true;
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

  onFotoSelected(event: any): void {
    const foto:File = event.target.files[0];

    if (foto) {
        let size = Math.round((foto.size / 1024));
        if (size >= this.globalDataService.MaxUploadSize){
          this.formModul.controls["foto_url"].setValue('');
          this.fileName = "";
          let maxSize = this.globalDataService.MaxUploadSize / 1024;
          this.globalDataService.erstelleMessage("error", "Foto darf nicht größer als " + maxSize + "MB sein!");
        }else {
          this.fileFound = true;
          this.fileName = foto.name;
        }

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
