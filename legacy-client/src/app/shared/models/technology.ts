export class Technology {
  id = '';
  name = '';
  domain = '';
  active = false;

  image = '';
  version = '';

  public constructor(init?: Partial<Technology>) {
    Object.assign(this, init);
  }
}
