import {IModel} from './IModel';
import {IEmployee} from './IEmployee';
import {IRole} from './IRole';

export interface ISchedule extends IModel{
  employeeId: string,
  employee: IEmployee;
  projectId: string,
  participation: number,
  roleId: string,
  role: IRole,
  startdate: Date,
  enddate: Date
}
