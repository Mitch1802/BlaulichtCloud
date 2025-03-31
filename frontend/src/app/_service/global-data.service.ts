import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { IPdfConfig } from '../_interface/pdfconfig';
import * as pdfMake from "pdfmake/build/pdfmake";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  Titel: string = 'Katplan';
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

  loadOtherDetail(modul: string, id: number) {
    this.router.navigate(['/detail/' + modul + '/' + id]);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/detail/' + modul + '/' + id]);
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
    let token: string = sessionStorage.getItem('KatPlanToken')!;
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

  changeModulKuerzelinModulName(kuerzel: string): string {
    let modul: string = '';
    if (kuerzel == 'K') {
      modul = 'katastrophen';
    } else if (kuerzel == 'G') {
      modul = 'gefahren';
    } else if (kuerzel == 'M') {
      modul = 'massnahmen';
    } else if (kuerzel == 'R') {
      modul = 'rollen';
    } else if (kuerzel == 'C') {
      modul = 'kontakte';
    } else if (kuerzel == 'D') {
      modul = 'dokumente';
    } else if (kuerzel == 'F') {
      modul = 'fahrzeuge';
    } else if (kuerzel == 'KM') {
      modul = 'kmaterial';
    }
    return modul;
  }

  ladeBreadcrumb(): any[] {
    let list: any = [];
    let pageNumber: number = parseInt(
      sessionStorage.getItem('KatPlanPageNumber')!
    );

    let page1: string = sessionStorage.getItem('KatPlanPage1')!;
    let page2: string = sessionStorage.getItem('KatPlanPage2')!;
    let page3: string = sessionStorage.getItem('KatPlanPage3')!;
    let page4: string = sessionStorage.getItem('KatPlanPage4')!;
    let page5: string = sessionStorage.getItem('KatPlanPage5')!;
    let page6: string = sessionStorage.getItem('KatPlanPage6')!;

    if (pageNumber == 1) {
      list.push(this.erstelleBreadcrumbLink(page1, true));
      sessionStorage.setItem('KatPlanPage2', '');
      sessionStorage.setItem('KatPlanPage3', '');
      sessionStorage.setItem('KatPlanPage4', '');
      sessionStorage.setItem('KatPlanPage5', '');
      sessionStorage.setItem('KatPlanPage6', '');
    } else {
      list.push(this.erstelleBreadcrumbLink(page1, false));
    }

    if (pageNumber == 2) {
      list.push(this.erstelleBreadcrumbLink(page2, true));
      sessionStorage.setItem('KatPlanPage3', '');
      sessionStorage.setItem('KatPlanPage4', '');
      sessionStorage.setItem('KatPlanPage5', '');
      sessionStorage.setItem('KatPlanPage6', '');
    } else if (pageNumber >= 2) {
      list.push(this.erstelleBreadcrumbLink(page2, false));
    }

    if (pageNumber == 3) {
      list.push(this.erstelleBreadcrumbLink(page3, true));
      sessionStorage.setItem('KatPlanPage4', '');
      sessionStorage.setItem('KatPlanPage5', '');
      sessionStorage.setItem('KatPlanPage6', '');
    } else if (pageNumber >= 3) {
      list.push(this.erstelleBreadcrumbLink(page3, false));
    }

    if (pageNumber == 4) {
      list.push(this.erstelleBreadcrumbLink(page4, true));
      sessionStorage.setItem('KatPlanPage5', '');
      sessionStorage.setItem('KatPlanPage6', '');
    } else if (pageNumber >= 4) {
      list.push(this.erstelleBreadcrumbLink(page4, false));
    }

    if (pageNumber == 5) {
      list.push(this.erstelleBreadcrumbLink(page5, true));
      sessionStorage.setItem('KatPlanPage6', '');
    } else if (pageNumber >= 5) {
      list.push(this.erstelleBreadcrumbLink(page5, false));
    }

    if (pageNumber == 6) {
      list.push(this.erstelleBreadcrumbLink(page6, true));
    }

    for (let i = 0; i < list.length; i++) {
      list[i].number = i + 1;
    }

    return list;
  }

  erstelleBreadcrumbLink(pagename: string, active: boolean): any {
    let link: string = '';
    let screenWidth: number = window.innerWidth;
    let page = pagename.replace(' ', '');
    let kuerzel = '';
    if (page.toLowerCase() == 'start') {
      link = '/start';
      kuerzel = 'Start';
    } else if (page.toLowerCase() == 'print') {
      link = '/print';
      kuerzel = 'Drucken';
    } else if (page.toLowerCase() == 'katastrophen') {
      link = '/modul/K';
      if (screenWidth > 500) {
        kuerzel = 'Katastrophen';
      } else {
        kuerzel = 'K';
      }
    } else if (page.toLowerCase() == 'gefahren') {
      link = '/modul/G';
      if (screenWidth > 500) {
        kuerzel = 'Gefahren';
      } else {
        kuerzel = 'G';
      }
    } else if (page.toLowerCase() == 'massnahmen') {
      link = '/modul/M';
      if (screenWidth > 500) {
        kuerzel = 'Maßnahmen';
      } else {
        kuerzel = 'M';
      }
    } else if (page.toLowerCase() == 'rollen') {
      link = '/modul/R';
      if (screenWidth > 500) {
        kuerzel = 'Rollen';
      } else {
        kuerzel = 'R';
      }
    } else if (page.toLowerCase() == 'kontakte') {
      link = '/modul/C';
      if (screenWidth > 500) {
        kuerzel = 'Kontakte';
      } else {
        kuerzel = 'C';
      }
    } else if (page.toLowerCase() == 'dokumente') {
      link = '/modul/D';
      if (screenWidth > 500) {
        kuerzel = 'Dokumente';
      } else {
        kuerzel = 'D';
      }
    } else if (page.toLowerCase() == 'fahrzeuge') {
      link = '/modul/F';
      if (screenWidth > 500) {
        kuerzel = 'Fahrzeuge';
      } else {
        kuerzel = 'F';
      }
    } else if (page.toLowerCase() == 'kmaterial') {
      link = '/modul/KM';
      if (screenWidth > 500) {
        kuerzel = 'KatMaterial';
      } else {
        kuerzel = 'KM';
      }
    } else if (page == 'V') {
      link = '/verwaltung';
      kuerzel = 'Verwaltung';
    } else if (page == 'V_K') {
      link = '/verwaltung/katastrophe';
      kuerzel = 'Katastrophe';
    } else if (page == 'V_G') {
      link = '/verwaltung/gefahr';
      kuerzel = 'Gefahr';
    } else if (page == 'V_M') {
      link = '/verwaltung/massnahme';
      kuerzel = 'Maßnahme';
    } else if (page == 'V_R') {
      link = '/verwaltung/rolle';
      kuerzel = 'V_R';
    } else if (page == 'V_C') {
      link = '/verwaltung/kontakt';
      kuerzel = 'Kontakt';
    } else if (page == 'V_D') {
      link = '/verwaltung/dokument';
      kuerzel = 'Dokument';
    } else if (page == 'V_F') {
      link = '/verwaltung/fahrzeug';
      kuerzel = 'V_F';
    } else if (page == 'V_B') {
      link = '/verwaltung/benutzer';
      kuerzel = 'Benutzer';
    } else if (page == 'V_KM') {
      link = '/verwaltung/kmaterial';
      kuerzel = 'KMaterial';
    } else if (page == 'V_KO') {
      link = '/verwaltung/konfiguration';
      kuerzel = 'Konfiguration';
    } else if (page == 'V_S') {
      link = '/verwaltung/self';
      kuerzel = 'Passwort';
    } else {
      let split = page.split('_');
      let modul = split[0];
      let id = split[1];
      link = '/detail/' + modul + '/' + id;
      kuerzel = split[2];
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
    let pageBack: string = sessionStorage.getItem("KatPlanPage" + pageNumberBack)!;
    let page: string = sessionStorage.getItem("KatPlanPage" + pageNumber)!;
    let pageForward: string = '';

    if (pageNumberForward <= 6) {
      pageForward = sessionStorage.getItem("KatPlanPage" + pageNumberForward)!;
    }

    if (pageNeu == pageBack) {
      sessionStorage.setItem("KatPlanPageNumber", pageNumberBack.toString());
      sessionStorage.setItem("KatPlanPage" + pageNumberBack, pageNeu);
    } else if (pageNeu == page) {
      sessionStorage.setItem("KatPlanPageNumber", pageNumber.toString());
      sessionStorage.setItem("KatPlanPage" + pageNumber, pageNeu);
    } else {
      sessionStorage.setItem("KatPlanPageNumber", pageNumberForward.toString());
      sessionStorage.setItem("KatPlanPage" + pageNumberForward, pageNeu);
    }
  }

  konvertiereDatenfuerPdfDokument(data: any, docDefinition: any, config: any) {
    let token: string = sessionStorage.getItem('KatPlanToken')!;

    let arrayKatastrophenGesamt: any = [];
    let arrayGefahrenGesamt: any = [];
    let arrayMassnahmenGesamt: any = [];
    let arrayRollenGesamt: any = [];
    let arrayKontakeGesamt: any = [];
    let arrayDokumenteGesamt: any = [];
    let arrayFahrzeugeGesamt: any = [];

    let arrayKatastrophen: any = [];
    let arrayGefahren: any = [];
    let arrayMassnahmen: any = [];
    let arrayRollen: any = [];
    let arrayKontake: any = [];
    let arrayFahrzeuge: any = [];
    let arrayKMaterial: any = [];
    let anhaenge: any = [];

    arrayKatastrophen = data.katastrophen;
    arrayGefahren = data.gefahren;
    arrayMassnahmen = data.massnahmen;
    arrayRollen = data.rollen;
    arrayKontake = data.kontakte;
    // arrayDokumente = data.dokumente;
    arrayFahrzeuge = data.fahrzeuge;
    arrayKMaterial = data.kmaterial;

    arrayKatastrophenGesamt = data.katastrophenGesamt;
    arrayGefahrenGesamt = data.gefahrenGesamt;
    arrayMassnahmenGesamt = data.massnahmenGesamt;
    arrayRollenGesamt = data.rollenGesamt;
    arrayKontakeGesamt = data.kontakteGesamt;
    arrayDokumenteGesamt = data.dokumenteGesamt;
    arrayFahrzeugeGesamt = data.fahrzeugeGesamt;

    let glossary = {
      toc: {
        id: 'mainToc',
        title: {
          text: 'Inhaltverzeichnis',
          style: 'header',
          pageBreak: 'before',
        },
      },
    };

    docDefinition.content.push(glossary);

    if (arrayKatastrophen.length > 0) {
      for (let i = 0; i < arrayKatastrophen.length; i++) {
        for (let c = 0; c < arrayKatastrophenGesamt.length; c++) {
          if (arrayKatastrophen[i].pkid == arrayKatastrophenGesamt[c].pkid) {
            anhaenge = [];
            let body: any = {};
            let ul: any = [];
            let data_kat: any = arrayKatastrophenGesamt[c];

            let header: any = {
              text: data_kat.kuerzel + ' - ' + data_kat.name,
              style: 'modulUeberschrift',
              margin: [0, 0, 0, 20],
              tocItem: 'mainToc',
              tocStyle: 'indexSub',
            };
            header.pageBreak = 'before';
            docDefinition.content.push(header);

            if (data_kat.beschreibung.length > 0) {
              body = {
                text: [
                  {
                    text: 'Beschreibung: ',
                    style: 'modulUberschrift2',
                  },
                  {
                    text: data_kat.beschreibung,
                    style: 'modulBody',
                  },
                ],
                margin: [0, 0, 0, 5],
              };
              docDefinition.content.push(body);
            }

            if (data_kat.rollen.length > 0) {
              body = {
                text: 'Rollen:',
                style: 'modulUberschrift2',
              };
              docDefinition.content.push(body);

              data_kat.rollen = this.addAllFieldsToNumberArray(arrayRollenGesamt, data_kat.rollen);
              ul = [];
              for (let c = 0; c < data_kat.rollen.length; c++) {
                let childName = data_kat.rollen[c].kuerzel + ' - ' + data_kat.rollen[c].name;
                ul.push(childName);
              }
              body = {
                ul: ul,
                style: 'modulBody',
                margin: [0, 0, 0, 5],
              };
              docDefinition.content.push(body);
            }

            if (data_kat.gefahren.length > 0) {
              body = {
                text: 'Gefahren:',
                style: 'modulUberschrift2',
              };
              docDefinition.content.push(body);
              anhaenge.push(
                this.konvertiereGefahrenfuerPdfDokument(
                  data_kat.gefahren,
                  arrayGefahrenGesamt,
                  arrayMassnahmenGesamt,
                  arrayRollenGesamt,
                  arrayDokumenteGesamt
                )
              );

              data_kat.gefahren = this.addAllFieldsToNumberArray(arrayGefahrenGesamt, data_kat.gefahren);
              ul = [];
              for (let c = 0; c < data_kat.gefahren.length; c++) {
                let childName = data_kat.gefahren[c].kuerzel + ' - ' + data_kat.gefahren[c].name;
                ul.push(childName);
              }
              body = {
                ul: ul,
                style: 'modulBody',
                margin: [0, 0, 0, 5],
              };
              docDefinition.content.push(body);
            }

            for (let x = 0; x < anhaenge.length; x++) {
              docDefinition.content.push(anhaenge[x]);
            }
          }
        }
      }
    } else if (arrayGefahren.length > 0) {
      anhaenge = [];
      anhaenge.push(
        this.konvertiereGefahrenfuerPdfDokument(
          arrayGefahren,
          arrayGefahrenGesamt,
          arrayMassnahmenGesamt,
          arrayRollenGesamt,
          arrayDokumenteGesamt
        )
      );
      for (let x = 0; x < anhaenge.length; x++) {
        docDefinition.content.push(anhaenge[x]);
      }
    }

    if (arrayMassnahmen.length > 0) {
      let massnahmen = [];

      massnahmen.push(
        this.konvertiereMassnahmenfuerPdfDokument(
          arrayMassnahmen,
          arrayMassnahmenGesamt,
          arrayKontakeGesamt,
          arrayFahrzeugeGesamt
        )
      );

      for (let x = 0; x < massnahmen.length; x++) {
        docDefinition.content.push(massnahmen[x]);
      }
    }

    if (arrayFahrzeuge.length > 0) {
      let fahrzeuge = [];

      fahrzeuge.push(
        this.konvertiereFahrzeugefuerPdfDokument(
          arrayFahrzeuge,
          arrayFahrzeugeGesamt
        )
      );

      for (let x = 0; x < fahrzeuge.length; x++) {
        docDefinition.content.push(fahrzeuge[x]);
      }
    }

    if (arrayRollen.length > 0) {
      let rollen = [];

      rollen.push(
        this.konvertiereRollenfuerPdfDokument(
          arrayRollen,
          arrayRollenGesamt,
          arrayKontakeGesamt
        )
      );

      for (let x = 0; x < rollen.length; x++) {
        docDefinition.content.push(rollen[x]);
      }
    }

    if (arrayKontake.length > 0) {
      let kontakteheader = {
        text: 'Kontakte',
        style: 'modulUeberschrift',
        tocItem: 'mainToc',
        tocStyle: 'indexSub',
        pageBreak: 'before',
      };
      let kontakte = [];

      docDefinition.content.push(kontakteheader);

      kontakte.push(
        this.konvertiereKontaktefuerPdfDokument(arrayKontake, arrayKontakeGesamt)
      );

      for (let x = 0; x < kontakte.length; x++) {
        docDefinition.content.push(kontakte[x]);
      }
    }

    if (arrayKMaterial.length > 0) {
      let kmaterialheader = {
        text: 'K-Material',
        style: 'modulUeberschrift',
        tocItem: 'mainToc',
        tocStyle: 'indexSub',
        pageBreak: 'before',
      };
      let kmaterial = [];

      docDefinition.content.push(kmaterialheader);

      kmaterial.push(this.konvertiereKMaterialfuerPdfDokument(arrayKMaterial));

      for (let x = 0; x < kmaterial.length; x++) {
        docDefinition.content.push(kmaterial[x]);
      }
    }

    let fz = arrayFahrzeugeGesamt;

    for (let x = 0; x < fz.length; x++) {
      let pfad = fz[x].foto.slice(1);
      if (pfad.includes("api/v3/")) {
        pfad = pfad.replace("api/v3/", "");
      }
      let imgPfad = environment.apiUrl + pfad;
      let image_dict: any = {};
      image_dict['url'] = imgPfad;
      let image_headers_dict: any = {};
      image_headers_dict['Authorization'] = 'Bearer ' + token
      image_dict['headers'] = image_headers_dict;
      docDefinition.images[fz[x].id] = image_dict;
    }

    docDefinition.styles = {
      titel: {
        fontSize: 40,
        bold: true,
        alignment: 'center',
      },
      deckblatt: {
        fontSize: 20,
        bold: true,
        margin: [0, 20, 0, 20],
        alignment: 'center',
      },
      indexSub: {
        fontSize: 14,
        bold: true,
      },
      indexSub2: {
        fontSize: 12,
      },
      modulUeberschrift: {
        fontSize: 20,
        bold: true,
      },
      modulUeberschriftKlein: {
        fontSize: 16,
        bold: true,
      },
      modulUberschrift2: {
        fontSize: 14,
        bold: true,
      },
      modulBody: {
        fontSize: 14,
      },
      header: {
        fontSize: 14,
        bold: true,
      },
      footer: {
        fontSize: 10,
      },
    };

    let fonts = {
      Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
      }
    };

    if (config.download == true) {
      let defaultFileName = 'Katplan';
      if (config.dateiname.length > 0) {
        defaultFileName = config.dateiname;
      }
      pdfMake.createPdf(docDefinition).download(defaultFileName + '.pdf');
    }

    if (config.print == true) {
      pdfMake.createPdf(docDefinition, undefined, fonts).print();
    } else {
      pdfMake.createPdf(docDefinition, undefined, fonts).open();
    }
  }

  konvertiereGefahrenfuerPdfDokument(
    data: any,
    arrayGefahrenGesamt: any,
    arrayMassnahmenGesamt: any,
    arrayRollenGesamt: any,
    arrayDokumenteGesamt: any
  ) {
    let anhaenge: any = [];
    let dataNeu: any = [];
    let body: any = {};
    let ul: any = [];

    for (let i = 0; i < data.length; i++) {
      anhaenge = [];

      for (let c = 0; c < arrayGefahrenGesamt.length; c++) {
        if (data[i] == arrayGefahrenGesamt[c].pkid) {
          let header: any = {
            text:
              arrayGefahrenGesamt[c].kuerzel +
              ' - ' +
              arrayGefahrenGesamt[c].name,
            style: 'modulUeberschrift',
            margin: [0, 0, 0, 20],
            tocItem: 'mainToc',
            tocStyle: 'indexSub2',
            tocMargin: [20, 0, 0, 0],
          };
          header.pageBreak = 'before';
          dataNeu.push(header);

          if (arrayGefahrenGesamt[c].beschreibung.length > 0) {
            body = {
              text: [
                {
                  text: 'Beschreibung: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayGefahrenGesamt[c].beschreibung,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayGefahrenGesamt[c].ausloeser.length > 0) {
            body = {
              text: [
                {
                  text: 'Auslöser: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayGefahrenGesamt[c].ausloeser,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayGefahrenGesamt[c].feld1Value.length > 0) {
            body = {
              text: [
                {
                  text: arrayGefahrenGesamt[c].feld1Name + ': ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayGefahrenGesamt[c].feld1Value,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayGefahrenGesamt[c].feld2Value.length > 0) {
            body = {
              text: [
                {
                  text: arrayGefahrenGesamt[c].feld2Name + ': ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayGefahrenGesamt[c].feld2Value,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayGefahrenGesamt[c].feld3Value.length > 0) {
            body = {
              text: [
                {
                  text: arrayGefahrenGesamt[c].feld3Name + ': ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayGefahrenGesamt[c].feld3Value,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayGefahrenGesamt[c].feld4Value.length > 0) {
            body = {
              text: [
                {
                  text: arrayGefahrenGesamt[c].feld4Name + ': ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayGefahrenGesamt[c].feld4Value,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayGefahrenGesamt[c].feld5Value.length > 0) {
            body = {
              text: [
                {
                  text: arrayGefahrenGesamt[c].feld5Name + ': ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayGefahrenGesamt[c].feld5Value,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayGefahrenGesamt[c].folgen.length > 0) {
            body = {
              text: [
                {
                  text: 'Folgen: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayGefahrenGesamt[c].folgen,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayGefahrenGesamt[c].gefahren.length > 0) {
            body = {
              text: [
                {
                  text: 'Zusätzliche Gefahren: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayGefahrenGesamt[c].gefahren,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayGefahrenGesamt[c].rollen.length > 0) {
            body = {
              text: 'Rollen:',
              style: 'modulUberschrift2',
            };
            dataNeu.push(body);

            let rollen = this.addAllFieldsToNumberArray(arrayRollenGesamt, arrayGefahrenGesamt[c].rollen);

            ul = [];
            for (let x = 0; x < rollen.length; x++) {
              let kon = rollen[x];
              let childName = kon.kuerzel + ' - ' + kon.name;
              ul.push(childName);
            }
            body = {
              ul: ul,
              style: 'modulBody',
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayGefahrenGesamt[c].massnahmen.length > 0) {
            body = {
              text: 'Massnahmen:',
              style: 'modulUberschrift2',
            };
            dataNeu.push(body);

            let massnahmen = this.addAllFieldsToNumberArray(arrayMassnahmenGesamt, arrayGefahrenGesamt[c].massnahmen!);

            ul = [];
            for (let x = 0; x < massnahmen.length; x++) {
              let kon = massnahmen[x];
              let childName = kon.kuerzel + ' - ' + kon.name;
              ul.push(childName);
            }
            body = {
              ul: ul,
              style: 'modulBody',
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayGefahrenGesamt[c].dokumente.length > 0) {
            body = {
              text: 'Dokumente:',
              style: 'modulUberschrift2',
            };
            dataNeu.push(body);

            let dokumente = this.addAllFieldsToNumberArray(arrayDokumenteGesamt, arrayGefahrenGesamt[c].dokumente!);

            ul = [];
            for (let x = 0; x < dokumente.length; x++) {
              let kon = dokumente[x];
              let childName = 'Anhang: ' + kon.kuerzel + ' - ' + kon.name;
              ul.push(childName);
            }
            body = {
              ul: ul,
              style: 'modulBody',
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }
        }
      }

      for (let x = 0; x < anhaenge.length; x++) {
        dataNeu.push(anhaenge[x]);
      }
    }

    return dataNeu;
  }

  konvertiereKontaktefuerPdfDokument(data: any, arrayKontakeGesamt: any) {
    let dataNeu: any = [];
    let body: any = {};

    for (let i = 0; i < data.length; i++) {
      for (let c = 0; c < arrayKontakeGesamt.length; c++) {
        if (data[i].pkid == arrayKontakeGesamt[c].pkid) {
          let header: any = {
            text:
              arrayKontakeGesamt[c].kuerzel +
              ' - ' +
              arrayKontakeGesamt[c].name,
            style: 'modulUeberschriftKlein',
            margin: [0, 10, 0, 0],
          };
          dataNeu.push(header);

          if (arrayKontakeGesamt[c].funktion.length > 0) {
            body = {
              text: [
                {
                  text: 'Funktion: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayKontakeGesamt[c].funktion,
                  style: 'modulBody',
                },
              ],
            };
            dataNeu.push(body);
          }

          if (arrayKontakeGesamt[c].telefon.length > 0) {
            body = {
              text: [
                {
                  text: 'Telefon: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayKontakeGesamt[c].telefon,
                  style: 'modulBody',
                },
              ],
            };
            dataNeu.push(body);
          }

          if (arrayKontakeGesamt[c].telefon2.length > 0) {
            body = {
              text: [
                {
                  text: 'Telefon2: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayKontakeGesamt[c].telefon2,
                  style: 'modulBody',
                },
              ],
            };
            dataNeu.push(body);
          }

          if (arrayKontakeGesamt[c].telefon3.length > 0) {
            body = {
              text: [
                {
                  text: 'Telefon3: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayKontakeGesamt[c].telefon3,
                  style: 'modulBody',
                },
              ],
            };
            dataNeu.push(body);
          }

          if (arrayKontakeGesamt[c].email.length > 0) {
            body = {
              text: [
                {
                  text: 'Email: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayKontakeGesamt[c].email,
                  style: 'modulBody',
                },
              ],
            };
            dataNeu.push(body);
          }
        }
      }
    }

    return dataNeu;
  }

  konvertiereKMaterialfuerPdfDokument(data: any) {
    let dataNeu: any = [];
    let body: any = {};

    for (let i = 0; i < data.length; i++) {
      let header: any = {
        text: data[i].artikel,
        style: 'modulUeberschriftKlein',
        margin: [0, 10, 0, 0],
      };
      dataNeu.push(header);

      if (data[i].bemerkung.length > 0) {
        body = {
          text: [
            {
              text: 'Bemerkung: ',
              style: 'modulUberschrift2',
            },
            {
              text: data[i].bemerkung,
              style: 'modulBody',
            },
          ],
        };
        dataNeu.push(body);
      }

      if (parseInt(data[i].menge) > 0) {
        body = {
          text: [
            {
              text: 'Menge: ',
              style: 'modulUberschrift2',
            },
            {
              text: data[i].menge,
              style: 'modulBody',
            },
          ],
        };
        dataNeu.push(body);
      }

      if (data[i].stationierungsort.length > 0) {
        body = {
          text: [
            {
              text: 'Stationierungsort: ',
              style: 'modulUberschrift2',
            },
            {
              text: data[i].stationierungsort,
              style: 'modulBody',
            },
          ],
        };
        dataNeu.push(body);
      }
    }

    return dataNeu;
  }

  konvertiereMassnahmenfuerPdfDokument(
    data: any,
    arrayMassnahmenGesamt: any,
    arrayKontakeGesamt: any,
    arrayFahrzeugeGesamt: any
  ) {
    let dataNeu: any = [];
    let body: any = {};
    let ul: any = [];

    for (let i = 0; i < data.length; i++) {
      for (let c = 0; c < arrayMassnahmenGesamt.length; c++) {
        if (data[i].pkid == arrayMassnahmenGesamt[c].pkid) {
          let header: any = {
            text:
              arrayMassnahmenGesamt[c].kuerzel +
              ' - ' +
              arrayMassnahmenGesamt[c].name,
            style: 'modulUeberschrift',
            margin: [0, 0, 0, 20],
          };
          header.pageBreak = 'before';
          header.tocItem = 'mainToc';
          header.tocStyle = 'indexSub';
          dataNeu.push(header);

          if (arrayMassnahmenGesamt[c].beschreibung.length > 0) {
            body = {
              text: [
                {
                  text: 'Beschreibung: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayMassnahmenGesamt[c].beschreibung,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayMassnahmenGesamt[c].kategorie.length > 0) {
            body = {
              text: [
                {
                  text: 'Kategorie: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayMassnahmenGesamt[c].kategorie,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayMassnahmenGesamt[c].verantwortung.length > 0) {
            body = {
              text: [
                {
                  text: 'Verantwortung: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayMassnahmenGesamt[c].verantwortung,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayMassnahmenGesamt[c].verstaendigung.length > 0) {
            body = {
              text: 'Verständigung durch:',
              style: 'modulUberschrift2',
            };
            dataNeu.push(body);

            let verstaendigung = this.addAllFieldsToNumberArray(arrayKontakeGesamt, arrayMassnahmenGesamt[c].verstaendigung);

            ul = [];
            for (
              let x = 0;
              x < verstaendigung.length;
              x++
            ) {
              let kon = verstaendigung[x];
              let childName =
                kon.kuerzel + ' - ' + kon.funktion + ' - ' + kon.name;
              ul.push(childName);
            }
            body = {
              ul: ul,
              style: 'modulBody',
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayMassnahmenGesamt[c].staerke.length > 0) {
            body = {
              text: [
                {
                  text: 'Stärke: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayMassnahmenGesamt[c].staerke,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayMassnahmenGesamt[c].fahrzeuge.length > 0) {
            body = {
              text: 'Fahrzeuge:',
              style: 'modulUberschrift2',
            };
            dataNeu.push(body);

            let fahrzeuge = this.addAllFieldsToNumberArray(arrayFahrzeugeGesamt, arrayMassnahmenGesamt[c].fahrzeuge);

            ul = [];
            for (
              let x = 0;
              x < fahrzeuge.length;
              x++
            ) {
              let kon = fahrzeuge[x];
              let childName = kon.kuerzel + ' - ' + kon.name;
              ul.push(childName);
            }
            body = {
              ul: ul,
              style: 'modulBody',
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayMassnahmenGesamt[c].feld1Value.length > 0) {
            body = {
              text: [
                {
                  text: arrayMassnahmenGesamt[c].feld1Name + ': ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayMassnahmenGesamt[c].feld1Value,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayMassnahmenGesamt[c].feld2Value.length > 0) {
            body = {
              text: [
                {
                  text: arrayMassnahmenGesamt[c].feld2Name + ': ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayMassnahmenGesamt[c].feld2Value,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayMassnahmenGesamt[c].feld3Value.length > 0) {
            body = {
              text: [
                {
                  text: arrayMassnahmenGesamt[c].feld3Name + ': ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayMassnahmenGesamt[c].feld3Value,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayMassnahmenGesamt[c].feld4Value.length > 0) {
            body = {
              text: [
                {
                  text: arrayMassnahmenGesamt[c].feld4Name + ': ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayMassnahmenGesamt[c].feld4Value,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayMassnahmenGesamt[c].feld5Value.length > 0) {
            body = {
              text: [
                {
                  text: arrayMassnahmenGesamt[c].feld5Name + ': ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayMassnahmenGesamt[c].feld5Value,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayMassnahmenGesamt[c].durchfuehrung.length > 0) {
            body = {
              text: [
                {
                  text: 'Durchführung: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayMassnahmenGesamt[c].durchfuehrung,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayMassnahmenGesamt[c].rueckbau.length > 0) {
            body = {
              text: [
                {
                  text: 'Rückbau: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayMassnahmenGesamt[c].rueckbau,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }
        }
      }
    }

    return dataNeu;
  }

  konvertiereRollenfuerPdfDokument(
    data: any,
    arrayRollenGesamt: any,
    arrayKontakeGesamt: any
  ) {
    let dataNeu: any = [];
    let body: any = {};
    let ul: any = [];

    for (let i = 0; i < data.length; i++) {
      for (let c = 0; c < arrayRollenGesamt.length; c++) {
        if (data[i].pkid == arrayRollenGesamt[c].pkid) {
          let header: any = {
            text:
              arrayRollenGesamt[c].kuerzel + ' - ' + arrayRollenGesamt[c].name,
            style: 'modulUeberschrift',
            margin: [0, 0, 0, 20],
          };
          header.pageBreak = 'before';
          header.tocItem = 'mainToc';
          header.tocStyle = 'indexSub';
          dataNeu.push(header);

          if (arrayRollenGesamt[c].beschreibung.length > 0) {
            body = {
              text: [
                {
                  text: 'Beschreibung: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayRollenGesamt[c].beschreibung,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayRollenGesamt[c].notruf.length > 0) {
            body = {
              text: [
                {
                  text: 'Notruf: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayRollenGesamt[c].notruf,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayRollenGesamt[c].aufgaben.length > 0) {
            body = {
              text: [
                {
                  text: 'Aufgaben: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayRollenGesamt[c].aufgaben,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayRollenGesamt[c].erreichbarkeit.length > 0) {
            body = {
              text: 'Erreichbarkeit:',
              style: 'modulUberschrift2',
            };
            dataNeu.push(body);

            arrayRollenGesamt[c].erreichbarkeit = this.addAllFieldsToNumberArray(arrayKontakeGesamt, arrayRollenGesamt[c].erreichbarkeit!);

            ul = [];
            for (
              let x = 0;
              x < arrayRollenGesamt[c].erreichbarkeit.length;
              x++
            ) {
              let kon = arrayRollenGesamt[c].erreichbarkeit[x];
              let childName = kon.kuerzel;
              if (kon.funktion != undefined) {
                if (kon.funktion.length > 0) {
                  childName += ' - ' + kon.funktion;
                }
              }
              if (kon.name != undefined) {
                if (kon.name.length > 0) {
                  childName += ' - ' + kon.name;
                }
              }
              ul.push(childName);
            }
            body = {
              ul: ul,
              style: 'modulBody',
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayRollenGesamt[c].verstaendigung.length > 0) {
            body = {
              text: 'Verständigung durch:',
              style: 'modulUberschrift2',
            };
            dataNeu.push(body);

            arrayRollenGesamt[c].verstaendigung = this.addAllFieldsToNumberArray(arrayKontakeGesamt, arrayRollenGesamt[c].verstaendigung!);

            ul = [];
            for (
              let x = 0;
              x < arrayRollenGesamt[c].verstaendigung.length;
              x++
            ) {
              let kon = arrayRollenGesamt[c].verstaendigung[x];
              let childName = kon.kuerzel;
              if (kon.name != undefined) {
                if (kon.name.length > 0) {
                  childName += ' - ' + kon.name;
                }
              }
              ul.push(childName);
            }
            body = {
              ul: ul,
              style: 'modulBody',
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }
        }
      }
    }

    return dataNeu;
  }

  konvertiereFahrzeugefuerPdfDokument(data: any, arrayFahrzeugeGesamt: any) {
    let dataNeu: any = [];
    let body: any = {};

    for (let i = 0; i < data.length; i++) {
      for (let c = 0; c < arrayFahrzeugeGesamt.length; c++) {
        if (data[i].pkid == arrayFahrzeugeGesamt[c].pkid) {
          let header: any = {
            text:
              arrayFahrzeugeGesamt[c].kuerzel +
              ' - ' +
              arrayFahrzeugeGesamt[c].name,
            style: 'modulUeberschrift',
            margin: [0, 0, 0, 20],
          };
          header.pageBreak = 'before';
          header.tocItem = 'mainToc';
          header.tocStyle = 'indexSub';
          dataNeu.push(header);

          if (arrayFahrzeugeGesamt[c].fahrzeug == true) {
            body = {
              text: [
                {
                  text: 'Fahrzeug: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: 'Ja',
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayFahrzeugeGesamt[c].anhaenger == true) {
            body = {
              text: [
                {
                  text: 'Anhänger: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: 'Ja',
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayFahrzeugeGesamt[c].type.length > 0) {
            body = {
              text: [
                {
                  text: 'Type: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayFahrzeugeGesamt[c].type,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayFahrzeugeGesamt[c].lenkerberechtigung.length > 0) {
            body = {
              text: [
                {
                  text: 'Lenkerberechtigung: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayFahrzeugeGesamt[c].lenkerberechtigung,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayFahrzeugeGesamt[c].stationierung.length > 0) {
            body = {
              text: [
                {
                  text: 'Stationierung: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayFahrzeugeGesamt[c].stationierung,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayFahrzeugeGesamt[c].personenkapazitaet.length > 0) {
            body = {
              text: [
                {
                  text: 'Personenkapazität: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayFahrzeugeGesamt[c].personenkapazitaet,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayFahrzeugeGesamt[c].treibstoff.length > 0) {
            body = {
              text: [
                {
                  text: 'Treibstoff: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayFahrzeugeGesamt[c].treibstoff,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayFahrzeugeGesamt[c].nutzlast > 0) {
            body = {
              text: [
                {
                  text: 'Nutzlast: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayFahrzeugeGesamt[c].nutzlast,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayFahrzeugeGesamt[c].ladebordwand == true) {
            body = {
              text: [
                {
                  text: 'Ladebordwand: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: 'Ja',
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayFahrzeugeGesamt[c].ladekran == true) {
            body = {
              text: [
                {
                  text: 'Ladekran: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: 'Ja',
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayFahrzeugeGesamt[c].wassertank.length > 0) {
            body = {
              text: [
                {
                  text: 'Wassertank: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayFahrzeugeGesamt[c].wassertank,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayFahrzeugeGesamt[c].wassertankAbnehmbar == true) {
            body = {
              text: [
                {
                  text: 'Wassertank abnehmbar: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: 'Ja',
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayFahrzeugeGesamt[c].geschlossenerAufbau == true) {
            body = {
              text: [
                {
                  text: 'Geschlossener Aufbau: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: 'Ja',
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayFahrzeugeGesamt[c].sonderausstattung.length > 0) {
            body = {
              text: [
                {
                  text: 'Sonderausstattung: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayFahrzeugeGesamt[c].sonderausstattung,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayFahrzeugeGesamt[c].anhaengervorrichtung.length > 0) {
            body = {
              text: [
                {
                  text: 'Anängervorrichtung: ',
                  style: 'modulUberschrift2',
                },
                {
                  text: arrayFahrzeugeGesamt[c].anhaengervorrichtung,
                  style: 'modulBody',
                },
              ],
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
          }

          if (arrayFahrzeugeGesamt[c].foto.length > 0) {
            body = {
              text: 'Foto: ',
              style: 'modulUberschrift2',
              margin: [0, 0, 0, 5],
            };
            dataNeu.push(body);
            body = {
              image: arrayFahrzeugeGesamt[c].id,
              width: 150
            }
            dataNeu.push(body);
          }
        }
      }
    }

    return dataNeu;
  }

  async pdfErstellen(config: IPdfConfig, data: any): Promise<any> {
    let docDefinition: any = {
      info: {
        title: 'Katastrophenschutzplan',
        author: 'Michael Reichenauer',
        creator: 'Michael Reichenauer',
        producer: 'Michael Reichenauer',
      },
      pageSize: 'A4', //PageSize w:w: 595.28, h: 841.89
      pageOrientation: 'portrait',
      pageMargins: [40, 70, 40, 40],
      header: {},
      content: [],
      footer: {},
      styles: {},
      images: {},
      defaultStyle: {
        font: 'Roboto'
      }
    };

    let konfig: any = JSON.parse(sessionStorage.getItem('KatPlanKonfig')!);
    let ort: string = konfig.plz + " " + konfig.ort;


    docDefinition.header = function (currentPage: any) {
      if (currentPage != 1) {
        return {
          text: 'Katastrophenschutzplan von ' + ort,
          style: 'header',
          margin: [40, 20, 40, 0],
        };
      } else {
        return {};
      }
    };

    let date = new Date();
    let aktuellesMonat = date.getMonth() + 1;
    let aktuellesDatum =
      date.getDate() + '.' + aktuellesMonat + '.' + date.getFullYear();

    docDefinition.footer = function (currentPage: any, pageCount: any) {
      if (currentPage != 1) {
        return {
          columns: [
            {
              text: 'Ausdruck vom ' + aktuellesDatum,
              alignment: 'left',
            },
            {
              text: 'Seite ' + currentPage.toString() + ' von ' + pageCount,
              alignment: 'right',
            },
          ],
          style: 'footer',
          margin: [40, 0, 40, 0],
        };
      } else {
        return {};
      }
    };

    docDefinition.content = [
      {
        text: 'Katastrophenschutzplan',
        style: 'titel',
        margin: [0, 200, 0, 0],
      },
      {
        text: ort,
        style: 'deckblatt',
      },
      {
        text: 'Ausdruck vom ' + aktuellesDatum,
        style: 'deckblatt',
      },
    ];

    this.konvertiereDatenfuerPdfDokument(data, docDefinition, config);
  }

  createNewKuerzel(buchstabe: string, data: any) {
    let newKuerzel = buchstabe;
    data.sort((p1: any, p2: any) => {
      if (p1.kuerzel < p2.kuerzel) return -1;
      if (p1.kuerzel > p2.kuerzel) return 1;
      return 0;
    });

    if (data.length > 0) {
      let lastKuerzel = data[data.length - 1].kuerzel;
      let lastNumber = lastKuerzel.replace(buchstabe, '');
      let newNumber = parseInt(lastNumber) + 1;

      if (newNumber < 10) {
        newKuerzel += '00';
        newKuerzel += newNumber;
      } else if (newNumber < 100) {
        newKuerzel += '0';
        newKuerzel += newNumber;
      } else {
        newKuerzel += newNumber;
      }
    } else {
      newKuerzel += '001';
    }

    return newKuerzel;
  }

  pruefeKuerzel(buchstabe: string, formKuerzel: any): string {
    let value = formKuerzel.value;
    let valueNeu = '';
    let length = formKuerzel.value.length;

    if (length == 1) {
      if (value[0] !== buchstabe && value !== '') {
        valueNeu = '';
        formKuerzel.patchValue(valueNeu);
      }
    } else if (length == 2) {
      if (isNaN(parseInt(value[1]))) {
        valueNeu = value.substring(0, 1);
        formKuerzel.patchValue(valueNeu);
      }
    } else if (length == 3) {
      if (isNaN(parseInt(value[2]))) {
        valueNeu = value.substring(0, 2);
        formKuerzel.patchValue(valueNeu);
      }
    } else if (length > 3) {
      valueNeu = value.substring(0, 3);
      formKuerzel.patchValue(valueNeu);
    }

    return valueNeu;
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
