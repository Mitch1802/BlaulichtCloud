export interface IAtemschutzMaskenProtokoll {
  id: string;
  maske_id: number;
  datum: string;
  taetigkeit: string;
  verwendung_typ: string;
  verwendung_min: number;
  wartung_2_punkt: boolean;
  wartung_unterdruck: boolean;
  wartung_oeffnungsdruck: boolean;
  wartung_scheibe: boolean;
  wartung_ventile: boolean;
  wartung_maengel: boolean;
  ausser_dienst: boolean;
  name_pruefer: string;
  austausch: string;
  created_at: string;
  updated_at: string;
}
