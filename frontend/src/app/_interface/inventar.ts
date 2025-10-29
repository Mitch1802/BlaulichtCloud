export interface IInventar {
  id: string;
  bezeichnung: string;
  anzahl: number;
  lagerort: string;
  notiz: string;
  foto_url?: string | null;
  created_at: string;
  updated_at: string;
}
