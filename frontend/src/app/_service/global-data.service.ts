import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  Titel: string = 'Blaulicht Cloud';
  Demo: boolean = false;
  Author: string = "Ing. M. Reichenauer";
  AppUrl: string = environment.apiUrl;
  MaxUploadSize: number = 20480; // 20 MB => 1024 KB = 1 MB
  MessageShowInSeconds = 5; // Sekunden

  abmelden(): void {
    let modul: string = 'auth/logout';
    this.post(modul, null, false).subscribe({
      next: (erg: any) => {
        try {
          sessionStorage.clear();
          document.cookie.split('; ').forEach(cookie => {
            const [name] = cookie.split('=');
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          });
          this.router.navigate(['/login']);
        } catch (e: any) {
          this.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.errorAnzeigen(error);
      }
    });
  }

  errorAnzeigen(response: any): void {
    if ('error' in response) {
      let msg = '';
      let count = 0;
      for (const [key, value] of Object.entries(response.error)) {
        if (count > 0) {
          msg += '\n';
        }
        msg += value;
        count += 1;
      }
      if (msg !== '') {
        this.erstelleMessage('error', msg);
      }
    }
    if (response.status == 401) {
      sessionStorage.clear();
      document.cookie.split('; ').forEach(cookie => {
        const [name] = cookie.split('=');
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
      this.router.navigate(['/login']);
      return;
    }

  }

  arraySortByKey(array: Array<any>, key: any) {
    array.sort(function (a: any, b: any) {
      return a[key] == b[key] ? 0 : +(a[key] > b[key]) || -1;
    });
    return array;
  }

  arraySortByKeyDesc(array: Array<any>, key: any) {
    array.sort(function (a: any, b: any) {
      return a[key] == b[key] ? 0 : +(a[key] < b[key]) || -1;
    });
    return array;
  }

  sucheArrayInArray(
    gesamtArray: Array<any>,
    teilArray: Array<any>,
    vergleichKey: string
  ) {
    let arrayNeu = [];
    for (let i = 0; i < gesamtArray.length; i++) {
      let count = 0;
      for (let x = 0; x < teilArray.length; x++) {
        if (gesamtArray[i][vergleichKey] == teilArray[x][vergleichKey]) {
          count += 1;
        }
      }
      if (count == 0) {
        arrayNeu.push(gesamtArray[i]);
      }
    }
    return arrayNeu;
  }

  sucheNumberArrayInObjectArray(gesamtArray: Array<any>, teilArray: Array<any>, gesamtArrayKey: string) {
    let arrayNeu = [];
    for (let i = 0; i < gesamtArray.length; i++) {
      let count = 0;
      for (let x = 0; x < teilArray.length; x++) {
        if (gesamtArray[i][gesamtArrayKey] == teilArray[x]) {
          count += 1;
        }
      }
      if (count == 0) {
        arrayNeu.push(gesamtArray[i]);
      }
    }
    return arrayNeu;
  }

  vergleicheZweiArrays(
    array1: Array<any>,
    array2: Array<any>,
    vergleichKey: string
  ) {
    let arrayNeu = array1;
    for (let i = 0; i < array2.length; i++) {
      let count = 0;
      for (let x = 0; x < arrayNeu.length; x++) {
        if (array2[i][vergleichKey] == arrayNeu[x][vergleichKey]) {
          count += 1;
        }
      }
      if (count == 0) {
        arrayNeu.push(array2[i]);
      }
    }
    return arrayNeu;
  }

  addItemFromSelectToList(
    control: AbstractControl,
    arrayGesamt: Array<any>,
    array: Array<any>
  ): void {
    let selectedId = control.value;
    if (selectedId !== '0') {
      if (array.length > 0) {
        let count = 0;
        for (let i = 0; i < array.length; i++) {
          if (selectedId === array[i]) {
            count += 1;
          }
        }
        if (count === 0) {
          for (let i = 0; i < arrayGesamt.length; i++) {
            if (selectedId === arrayGesamt[i].pkid) {
              array.push({
                pkid: arrayGesamt[i].pkid,
                kuerzel: arrayGesamt[i].kuerzel,
                name: arrayGesamt[i].name,
              });
              arrayGesamt.splice(i, 1);
            }
          }
        }
      } else {
        for (let i = 0; i < arrayGesamt.length; i++) {
          if (selectedId === arrayGesamt[i].pkid) {
            array.push({
              pkid: arrayGesamt[i].pkid,
              kuerzel: arrayGesamt[i].kuerzel,
              name: arrayGesamt[i].name,
            });
            arrayGesamt.splice(i, 1);
          }
        }
      }

      control.setValue(0, { onlySelf: true });
      array = this.arraySortByKey(array, 'kuerzel');
    }
  }

  addItemFromListToSelect(
    pkid: string,
    arrayGesamt: Array<any>,
    array: Array<any>
  ): void {
    for (let i = 0; i < array.length; i++) {
      if (pkid === array[i].pkid) {
        arrayGesamt.push({ pkid: array[i].pkid, kuerzel: array[i].kuerzel, name: array[i].name });
        array.splice(i, 1);
      }
    }
    arrayGesamt = this.arraySortByKey(arrayGesamt, 'kuerzel');
  }

  addFeldInArray(
    arrayGesamt: Array<any>,
    array: Array<any>,
    feldName: string
  ): Array<any> {
    for (let i = 0; i < array.length; i++) {
      let kuerzel = array[i].kuerzel;
      for (let x = 0; x < arrayGesamt.length; x++) {
        if (kuerzel == arrayGesamt[x].kuerzel) {
          array[i][feldName] = arrayGesamt[x][feldName];
        }
      }
    }

    return array;
  }

  addAllFieldsToNumberArray(arrayGesamt: Array<any>, array: Array<any>): Array<any> {
    let data_new = [];
    for (let i = 0; i < array.length; i++) {
      let pkid = array[i];
      for (let x = 0; x < arrayGesamt.length; x++) {
        if (pkid == arrayGesamt[x].pkid) {
          data_new.push(arrayGesamt[x]);
        }
      }
    }

    return data_new;
  }

  ladeHeaders(filesVorhanden: boolean): any {
    let token: string = sessionStorage.getItem('Token')!;
    let headers = {};

    if (token != undefined) {
      if (filesVorhanden == true) {
        headers = {
          Authorization: 'Bearer ' + token
        };
      } else {
        headers = {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + token
        };
      }
    }
    return headers;
  }

  get(modul: string, param?: any): Observable<any[]> {
    let headers = this.ladeHeaders(false);
    let url = this.AppUrl + modul;
    let paramUrl = '';
    for (var prop in param) {
      if (param.hasOwnProperty(prop)) {
        if (paramUrl == '') {
          paramUrl += '?' + prop + '=' + param[prop];
        } else {
          paramUrl += '&' + prop + '=' + param[prop];
        }
      }
    }

    if (paramUrl == '') {
      url += '/';
    } else {
      url += paramUrl;
    }

    let response: any = this.http.get<any[]>(url, { headers: headers });

    return response;
  }

  post(modul: string, daten: any, filesVorhanden: boolean): Observable<any[]> {
    let headers = this.ladeHeaders(filesVorhanden);
    let url = this.AppUrl + modul + '/';
    let response: any = this.http.post<any[]>(url, daten, { headers: headers });

    return response;
  }

  postBlob(modul: string, daten: any): Observable<Blob> {
    let headers = this.ladeHeaders(true);
    headers = {
      ...headers,
      'Accept': '*/*'
    };
    let url = this.AppUrl + modul + '/';
    let response: any = this.http.post(url, daten, {
      headers: headers,
      responseType: 'blob' as 'json'
    }) as Observable<Blob>;

    return response;
  }

  patch(
    modul: string,
    id: number,
    daten: any,
    filesVorhanden: boolean
  ): Observable<any[]> {
    let headers = this.ladeHeaders(filesVorhanden);
    let url = this.AppUrl + modul + '/' + id + '/';
    let response: any = this.http.patch<any[]>(url, daten, {
      headers: headers,
    });

    return response;
  }

  delete(modul: string, id: number): Observable<any[]> {
    let headers = this.ladeHeaders(false);
    let url = this.AppUrl + modul + '/' + id + '/';
    let response: any = this.http.delete<any[]>(url, { headers: headers });

    return response;
  }

  ladeBreadcrumb(): any[] {
    let list: any = [];
    let pageNumber: number = parseInt(
      sessionStorage.getItem('PageNumber')!
    );

    let page1: string = sessionStorage.getItem('Page1')!;
    let page2: string = sessionStorage.getItem('Page2')!;


    if (pageNumber == 1) {
      list.push(this.erstelleBreadcrumbLink(page1, true));
      sessionStorage.setItem('Page2', '');

    } else {
      list.push(this.erstelleBreadcrumbLink(page1, false));
    }

    if (pageNumber == 2) {
      list.push(this.erstelleBreadcrumbLink(page2, true));
    } 

    for (let i = 0; i < list.length; i++) {
      list[i].number = i + 1;
    }

    return list;
  }

  erstelleBreadcrumbLink(pagename: string, active: boolean): any {
    let link: string = '';
    let page = pagename.replace(' ', '');
    let kuerzel = '';
    if (page.toLowerCase() == 'start') {
      link = '/start';
      kuerzel = 'Start';
    } else if (page == 'FMD') {
      link = '/fmd';
      kuerzel = 'FMD';
    } else if (page == 'V_M') {
      link = '/mitglied';
      kuerzel = 'Mitglieder';
    } else if (page == 'V_B') {
      link = '/benutzer';
      kuerzel = 'Benutzer';
    } else if (page == 'V_KO') {
      link = '/verwaltung/konfiguration';
      kuerzel = 'Konfiguration';
    }

    let btn = {
      name: pagename,
      link: link,
      number: 0,
      kuerzel: kuerzel,
      active: active,
    };

    return btn;
  }

  setzeNeueBreadcrumbDaten(pageNeu: string, pageNumber: number): any {
    let pageNumberBack: number = pageNumber - 1;
    let pageNumberForward: number = pageNumber + 1;
    let pageBack: string = sessionStorage.getItem("Page" + pageNumberBack)!;
    let page: string = sessionStorage.getItem("Page" + pageNumber)!;
    let pageForward: string = '';

    if (pageNumberForward <= 6) {
      pageForward = sessionStorage.getItem("Page" + pageNumberForward)!;
    }

    if (pageNeu == pageBack) {
      sessionStorage.setItem("PageNumber", pageNumberBack.toString());
      sessionStorage.setItem("Page" + pageNumberBack, pageNeu);
    } else if (pageNeu == page) {
      sessionStorage.setItem("PageNumber", pageNumber.toString());
      sessionStorage.setItem("Page" + pageNumber, pageNeu);
    } else {
      sessionStorage.setItem("PageNumber", pageNumberForward.toString());
      sessionStorage.setItem("Page" + pageNumberForward, pageNeu);
    }
  }

  erstelleMessage(art: string, msg: string) {
    let horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    let verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    let panelClass: string = '';

    if (art == 'success') {
      panelClass = 'msg-snackbar-success';
    } else if (art == 'info') {
      panelClass = 'msg-snackbar-info';
    } else if (art == 'error') {
      panelClass = 'msg-snackbar-error';
    }

    this._snackBar.open(msg, 'X', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: this.MessageShowInSeconds * 1000,
      panelClass: panelClass,
    });
  }

  ladeFooter(): string {
    let year = new Date().getFullYear();
    let author = this.Author;
    let footer = "Version " + environment.version + "\n" + String.fromCharCode(169) + " " + year + " by " + author;
    return footer;
  }

}
