import {Employee} from './employee';
import {Role} from './role';
import {Project} from './project';

export class Schedule {
  id = '';
  participation = 0.0;
  startdate: Date = new Date();
  enddate: Date;
  active = false;

  project: Project = new Project();
  employee: Employee = new Employee();
  role: Role = new Role();

  roleid: string;
  employeeid: string;

  public constructor(init?: Partial<Schedule>) {
    Object.assign(this, init);
  }
}
