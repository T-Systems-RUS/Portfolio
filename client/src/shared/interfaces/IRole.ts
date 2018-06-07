import {IModel} from './IModel';
import {ISchedule} from './ISchedule';


export interface IRole extends IModel{
  name: string;
  domain: string;
  leadrole: boolean;
  schedules: ISchedule[];
}
