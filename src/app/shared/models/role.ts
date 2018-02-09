export class Role {
  id = '';
  name = '';
  participation = '';
  seniority = '';
  leadrole = false;

  public constructor(init?: Partial<Role>) {
    Object.assign(this, init);
  }
}
