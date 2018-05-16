import {IModel} from './IModel';
import {ISchedule} from './ISchedule';
import {IDomain} from './IDomain';
import {IProgram} from './IProgram';
import {ICustomer} from './ICustomer';
import {IType} from './IType';
import {ITechnology} from './ITechnology';


export interface IProject extends IModel{
    name: string;
    description: string;
    domain: IDomain;
    program: IProgram;
    type: IType;
    schedules: ISchedule[];
    customers: ICustomer[];
    technologies: ITechnology[];
    startdate:string;
    enddate:string;
    createdAt:Date;
    updatedAt: Date;
}
