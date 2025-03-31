import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import * as CryptoJS from 'crypto-js';
import { fromEvent, map, merge, of, Subscription } from 'rxjs';
import { ISyncData } from '../_interface/syncdata';

const secretKey: string = "changeme";

@Injectable({
  providedIn: 'root'
})
export class AppDB extends Dexie {
  katplanOffline!: Table<any>;

  constructor() {
    super('katplanOfflineDB');
    this.version(3).stores({
      katplanOffline: 'name',
    });
  }

  async resetDatabase() {
    try {
      await offlineDB.transaction('rw', 'katplanOffline', () => {
        this.katplanOffline.clear();
      });
    } catch (error) {
      console.error('Error resetting database:', error);
    }
  }
}

export const offlineDB = new AppDB();

@Injectable({
  providedIn: 'root'
})
export class OfflineDataService {
  networkStatus: any;
  networkStatus$: Subscription = Subscription.EMPTY;

  async syncOnlineDB(data: ISyncData) {
    await offlineDB.resetDatabase();

    for (let i = 0; i < data.benutzer.length; i++) {
      delete data.benutzer[i]["pkid"];
      delete data.benutzer[i]["last_login"];
      delete data.benutzer[i]["is_superuser"];
      delete data.benutzer[i]["id"];
      delete data.benutzer[i]["email"];
      delete data.benutzer[i]["date_joined"];
      delete data.benutzer[i]["groups"];
      delete data.benutzer[i]["user_permissions"];
      delete data.benutzer[i]["admin"];
    }

    let encryptedDataKatastrophe = this.encryptData(JSON.stringify(data.katastrophen), secretKey);
    let encryptedDataGefahr = this.encryptData(JSON.stringify(data.gefahren), secretKey);
    let encryptedDataMassnahme = this.encryptData(JSON.stringify(data.massnahmen), secretKey);
    let encryptedDataRolle = this.encryptData(JSON.stringify(data.rollen), secretKey);
    let encryptedDataKontakte = this.encryptData(JSON.stringify(data.kontakte), secretKey);
    let encryptedDataDokumente = this.encryptData(JSON.stringify(data.dokumente), secretKey);
    let encryptedDataFahrzeuge = this.encryptData(JSON.stringify(data.fahrzeuge), secretKey);
    let encryptedDataKMaterial = this.encryptData(JSON.stringify(data.kmaterial), secretKey);
    let encryptedDataBenutzer = this.encryptData(JSON.stringify(data.benutzer), secretKey);
    let encryptedDataKonfig = this.encryptData(JSON.stringify(data.konfiguration), secretKey);

    await offlineDB.katplanOffline.add({ name: 'katastrophen', data: encryptedDataKatastrophe });
    await offlineDB.katplanOffline.add({ name: 'gefahren', data: encryptedDataGefahr });
    await offlineDB.katplanOffline.add({ name: 'massnahmen', data: encryptedDataMassnahme });
    await offlineDB.katplanOffline.add({ name: 'rollen', data: encryptedDataRolle });
    await offlineDB.katplanOffline.add({ name: 'kontakte', data: encryptedDataKontakte });
    await offlineDB.katplanOffline.add({ name: 'dokumente', data: encryptedDataDokumente });
    await offlineDB.katplanOffline.add({ name: 'fahrzeuge', data: encryptedDataFahrzeuge });
    await offlineDB.katplanOffline.add({ name: 'kmaterial', data: encryptedDataKMaterial });
    await offlineDB.katplanOffline.add({ name: 'benutzer', data: encryptedDataBenutzer });
    await offlineDB.katplanOffline.add({ name: 'konfiguration', data: encryptedDataKonfig });

    return true;
  }

  async getOfflineData() {
    let data_return: any = {};
    const offlineData = await offlineDB.katplanOffline.toArray();
    offlineData.forEach(item => {
      const decryptedData = this.decryptData(item.data, secretKey);
      if (!decryptedData) {
        console.warn(`Failed to decrypt data for: ${item.name}`);
      }
      data_return[item.name] = decryptedData;
    });
    
    return data_return;
  }

  async getModuleData(modulName: string) {
    const data = await this.getOfflineData();
    let data_return = JSON.parse(data[modulName]);
    return data_return;
  }

  encryptData(data: string, secretKey: string): string {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  }

  decryptData(encryptedData: string, secretKey: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        this.networkStatus = status;
      });
  }
}
