export class CommonEvent {
  public datePublication?: string|Date;
  public ligne1?: string;
  public ligne2?: string;
  public ligne3?: string;
  public ligne4?: string;
  public ligne5?: string;
  public ligne6?: string;
}

export class Event extends CommonEvent {
  public type?: string|'accident'|'panne'|'deviation'|'vent';
  public zone?: string|'a'|'b'|'c'|'d'|'e'|'nord'|'sud';
  public icon?: string;
  public label?: string;
  public status?: string|'en cours'|'prévisionnel';
}

export class ApiEvent extends CommonEvent {
  public identifiant?: string;
  public rattachement?: string;
  public nature?: string;
  public type?: string;
  public statut?: string;
  public longitude?: number;
  public latitude?: number;
}
