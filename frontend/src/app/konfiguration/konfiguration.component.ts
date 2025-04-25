import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { IKonfiguration } from 'src/app/_interface/konfiguration';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';
import { HeaderComponent } from '../_template/header/header.component';
import { MatChipsModule } from '@angular/material/chips';

@Component({
    selector: 'app-konfiguration',
    templateUrl: './konfiguration.component.html',
    styleUrls: ['./konfiguration.component.sass'],
    standalone: true,
    imports: [CommonModule, HeaderComponent, MatCardModule, FormsModule, ReactiveFormsModule, MatButton, MatFormField, MatLabel, MatInput, MatError, MatList, MatListItem, MatIconModule, MatChipsModule]
})
export class KonfigurationComponent implements OnInit {
  globalDataService = inject(GlobalDataService);
  router = inject(Router);
  breadcrumb: any = [];

  title: string = "Aktive Rollen";
  title2: string = "Konfiguration";
  title3: string = "Backup & Wiederherstellen";
  modul: string = "users/rolle";
  modul2: string = "konfiguration";

  @Output() breadcrumbout = new EventEmitter<any[]>();

  rollen: any = []

  file: HTMLInputElement = <HTMLInputElement>document.getElementById("backupUpload");
  uploadText: string = "";
  backups: any = [];
  backup_msg: string = "";

  formRolle = new FormGroup({
    rolle: new FormControl('', Validators.required)
  });

  formKonfig = new FormGroup({
    id: new FormControl(0),
    plz: new FormControl('', Validators.required),
    ort: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    sessionStorage.setItem("PageNumber", "2");
    sessionStorage.setItem("Page2", "V_KO");
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();
    this.formRolle.disable();
    this.formKonfig.disable();

    this.globalDataService.get(this.modul2).subscribe({
      next: (erg: any) => {
        try {
          this.formRolle.enable();
          this.formKonfig.enable();
          if (erg.data.main.length > 0){
            let details: IKonfiguration = erg.data.main[0];
            this.formKonfig.setValue({
              id: details.id,
              plz: details.plz,
              ort: details.ort
            })
            this.rollen = erg.data.rollen;
            this.uploadText="";
          }
          this.backups = this.convertBackups(erg.data.backups);
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  rolleSpeichern(): void {
    let object = this.formRolle.value;
    let rolle_neu = object.rolle;

    let post = {
      "key": rolle_neu,
      "verbose_name": rolle_neu
    }


    this.globalDataService.post(this.modul, post, false).subscribe({
      next: (erg: any) => {
        try {

          this.globalDataService.erstelleMessage("success","Rolle erfolgreich gespeichert!");
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  rolleLoeschen(rolle: any): void {  
    const id = rolle.id;
    this.globalDataService.delete(this.modul, id).subscribe({
      next: (erg: any) => {
        try {
          this.rollen = this.rollen.filter(r => r.id !== id);
          this.globalDataService.erstelleMessage("success",this.backup_msg);
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  konfigSpeichern(): void {
    let object = this.formKonfig.value;

    let idValue = this.formKonfig.controls["id"].value;
    if (idValue === 0 || idValue === null) {
      this.globalDataService.post(this.modul2, object, false).subscribe({
        next: (erg: any) => {
          try {
            let details: IKonfiguration = erg.data;
            this.formKonfig.setValue({
              id: details.id,
              plz: details.plz,
              ort: details.ort
            })
            this.globalDataService.erstelleMessage("success","Konfiguration erfolgreich gespeichert!");
          } catch (e: any) {
            this.globalDataService.erstelleMessage("error", e);
          }
        },
        error: (error: any) => {
          this.globalDataService.errorAnzeigen(error);
        }
      });
    } else {
      this.globalDataService.patch(this.modul2, idValue, object, false).subscribe({
        next: (erg: any) => {
          try {
            let details: IKonfiguration = erg.data;
            this.formKonfig.setValue({
              id: details.id,
              plz: details.plz,
              ort: details.ort
            })
            this.globalDataService.erstelleMessage("success","Konfiguration erfolgreich geändert!");
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

  backupImport(backup_name: any): void {
    let object = {
      "backup": backup_name.name
    }

    this.globalDataService.post("backup/restore", object, false).subscribe({
      next: (erg: any) => {
        try {
          this.backup_msg = erg.msg;
          this.globalDataService.erstelleMessage("success",this.backup_msg);
          sessionStorage.clear();
          document.cookie.split('; ').forEach(cookie => {
            const [name] = cookie.split('=');
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          });
          this.router.navigate(['/login']);
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  backupErstellen(): void {
    this.globalDataService.post("backup", {}, false).subscribe({
      next: (erg: any) => {
        try {
          this.backup_msg = erg.msg;
          this.backups = this.convertBackups(erg.backups);
          this.globalDataService.erstelleMessage("success",this.backup_msg);
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  backupDownload(backup_name: any): void {
    let object = {
      "backup": backup_name.name
    }

    this.globalDataService.postBlob("backup/file", object).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = backup_name.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  backupLoeschen(backup_name: any): void {
    let object = {
      "backup": backup_name.name
    }

    this.globalDataService.post("backup/delete", object, false).subscribe({
      next: (erg: any) => {
        try {
          this.backup_msg = erg.msg;
          this.backups = this.convertBackups(erg.backups);
          this.globalDataService.erstelleMessage("success",this.backup_msg);
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }


  convertBackups(backup_array:any ): any {
    let version = environment.version;
    let data = [];
    for (let i = 0; i < backup_array.length; i++) {
      let file = backup_array[i];
      let backup_version = file.split('_');
      backup_version = backup_version[1];

      if (backup_version == version) {
        let dict = {
          "name": file,
        }
        data.push(dict);
      }
    }
    data = this.globalDataService.arraySortByKeyDesc(data, "name");
    return data;
  }
}
