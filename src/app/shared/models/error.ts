export class Error {

  status: number;
  statusText = '';
  errors: string[] = new Array<string>();

  public constructor(init?: Partial<Error>) {
    Object.assign(this, init);
  }
}
