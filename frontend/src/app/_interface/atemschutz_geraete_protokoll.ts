export interface IAtemschutzGeraeteProtokoll {
  id: string;
  geraet_id: number;
  datum: string;
  taetigkeit: string;
  verwendung_typ: string;
  verwendung_min: number;
  geraet_ok: boolean;
  name_pruefer: string;
  created_at: string;
  updated_at: string;
}
