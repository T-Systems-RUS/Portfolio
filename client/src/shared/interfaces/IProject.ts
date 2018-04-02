import {IModel} from './IModel';
import {ISchedule} from './ISchedule';


export interface IProject extends IModel{
    name: string;
    description: string;
    domain: string;
    line: string;
    schedules: ISchedule[];
    startdate:string;
    enddate:string;
    createdAt:Date;
    updatedAt: Date;
}
