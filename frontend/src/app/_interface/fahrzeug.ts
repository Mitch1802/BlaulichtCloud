export type CheckStatus = "ok" | "missing" | "damaged";

export interface IFahrzeugPublic {
  name: string;
  bezeichnung: string;
  beschreibung: string;
  public_id: string;
  raeume: Array<{
    name: string;
    reihenfolge: number;
    items: Array<{
      name: string;
      menge: number;
      einheit: string;
      notiz: string;
      reihenfolge: number;
    }>;
  }>;
}

export interface IFahrzeugAuth extends IFahrzeugPublic {
  id: string;
  raeume: Array<{
    id: string;
    name: string;
    reihenfolge: number;
    items: Array<{
      id: string;
      name: string;
      menge: number;
      einheit: string;
      notiz: string;
      reihenfolge: number;
    }>;
  }>;
}

export interface ICheckDraftItem {
  status: CheckStatus;
  menge_aktuel?: number | null;
  notiz?: string;
}

export interface IFahrzeugList {
  id: string;
  name: string;
  bezeichnung: string;
  public_id: string;
}

export interface IRaumItem {
  id: string;
  name: string;
  menge: number;
  einheit: string;
  notiz: string;
  reihenfolge: number;
}

export interface IFahrzeugRaum {
  id: string;
  name: string;
  reihenfolge: number;
  items: IRaumItem[];
}

export interface IFahrzeugDetail {
  id: string;
  name: string;
  bezeichnung: string;
  beschreibung: string;
  public_id: string;
  raeume: IFahrzeugRaum[];
}
