export interface Status {
  code?: string;
  label?: string;
  colorStatus?: {
    north: string
    south: string
  };
  from?: string | Date;
  next?: Status[];
  labelFermeture?: string;
}

export interface ApiStatus {
  // tslint:disable-next-line: variable-name
  code_mode?: string;
  // tslint:disable-next-line: variable-name
  code_current_mode?: string;
  // tslint:disable-next-line: variable-name
  lib_mode?: string;
  // tslint:disable-next-line: variable-name
  lib_current_mode?: string;
  // tslint:disable-next-line: variable-name
  next_mode?: ApiStatus[];
  from?: string;
  close_from?: string;
  closed_to?: string;
}

export interface UtilDate {
  dateFormat: string;
  timeFormat: string;
  dateToCompare: number;
}
