import {IModel} from './IModel';

export interface ISchedule extends IModel{
  employeeId: string,
  projectId: string,
  participation: number,
  startdate: Date,
  enddate: Date
}
