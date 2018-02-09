import {Technology} from './technology';
import {Schedule} from './schedule';

export class Employee {
  id = '';
  firstname = '';
  lastname = '';
  active = false;
  participation = 0.0;
  schedules: Schedule[] = new Array<Schedule>();
  technologies: Technology[] = new Array<Technology>();

  get fullname() {
    return this.firstname + ' ' + this.lastname;
  }

  public constructor(init?: Partial<Employee>) {
    Object.assign(this, init);
  }
}
