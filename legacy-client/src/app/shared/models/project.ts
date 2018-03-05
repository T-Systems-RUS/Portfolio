import {Technology} from './technology';
import {Employee} from './employee';
import {Schedule} from './schedule';

export class Project {
  id = '';
  customer = '';
  name = '';
  line = '';
  domain = '';
  description = '';
  updatedAt: Date = new Date();

  // new props
  pss = 0.0;
  feedback = '';
  program = '';
  type = '';
  image = '';

  technologies: Technology[] = new Array<Technology>();
  employees: Employee[] = new Array<Employee>();

  schedules: Schedule[] = new Array<Schedule>();

  version = 1;
  teamcount = 0;
  startdate: Date;
  enddate: Date;

  errors: Object = {};

  required: string[];

  generateErrors(unvalidFields: string[]) {
    this.errors = {};
    unvalidFields.map(field => {
      this.errors[field] = `${field} is required`;
    });
  }

  public constructor(init?: Partial<Project>) {
    Object.assign(this, init);
    this.errors = {};
    this.required = ['name', 'line', 'domain', 'startdate', 'description', 'type', 'program'];
  }
}
