export class Constants {

  lines: string[];
  domains: string[];
  types: string[];
  programs: string[];
  customers: Set<string>;
  roles: string[];
  technologies: string[];

  public constructor(init?: Partial<Error>) {
    Object.assign(this, init);
  }
}
