import {IModel} from './IModel';
import {ITechnology} from './ITechnology';
import {ISchedule} from './ISchedule';


export interface IEmployee extends IModel{
  firstname: string;
  lastname: string;
  technologies: ITechnology[];
  schedules: ISchedule[];
}
