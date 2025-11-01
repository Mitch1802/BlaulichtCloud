export interface IAtemschutzMaskenProtokoll {
  id: string;
  maske_id: number;
  datum: string;
  taetigkeit: string;
  verwendung_typ: string;
  verwendung_min: number;
  wartung_2_punkt: string;
  wartung_unterdruck: string;
  wartung_oeffnungsdruck: string;
  wartung_scheibe: string;
  wartung_ventile: string;
  wartung_maengel: string;
  ausser_dienst: boolean;
  name_pruefer: string;
  austausch: string;
  created_at: string;
  updated_at: string;
}
