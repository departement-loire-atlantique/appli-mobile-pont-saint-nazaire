export class Status {
  public code: string;
  public label: string;
  public colorStatus?: {
    north: string
    south: string
  };
  public from?: string|Date;
  public next?: Status[];
}

export class ApiStatus {
  // tslint:disable-next-line: variable-name
  public code_mode?: string;
  // tslint:disable-next-line: variable-name
  public code_current_mode?: string;
  // tslint:disable-next-line: variable-name
  public lib_mode?: string;
  // tslint:disable-next-line: variable-name
  public lib_current_mode?: string;
  // tslint:disable-next-line: variable-name
  public next_mode?: ApiStatus[];
  public from?: string;
}
