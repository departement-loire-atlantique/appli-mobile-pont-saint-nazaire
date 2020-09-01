export class Event {
  public type: 'accident'|'panne'|'deviation'|'vent';
  public zone: 'a'|'b'|'c'|'d'|'e'|'nord'|'sud';
}

export class ApiEvent {
  public identifiant?: string;
  public datePublication?: string;
  public ligne1?: string;
  public ligne2?: string;
  public ligne3?: string;
  public ligne4?: string;
  public ligne5?: string;
  public ligne6?: string;
  public rattachement?: string;
  public nature?: string;
  public type?: string;
  public statut?: string;
  public longitude: number;
  public latitude: number;
}
