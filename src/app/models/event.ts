export interface CommonEvent {
  datePublication?: string | Date;
  ligne1?: string;
  ligne2?: string;
  ligne3?: string;
  ligne4?: string;
  ligne5?: string;
  ligne6?: string;
}

export interface Event extends CommonEvent {
  type?: string | 'accident' | 'panne' | 'deviation' | 'vent';
  zone?: string | 'a' | 'b' | 'c' | 'd' | 'e' | 'nord' | 'sud';
  icon?: string;
  label?: string;
  status?: string | 'en cours' | 'prévisionnel';
}

export interface ApiEvent extends CommonEvent {
  identifiant?: string;
  rattachement?: string;
  nature?: string;
  type?: string;
  statut?: string;
  longitude?: string;
  latitude?: string;
}
