import {Technology} from './technology';
import {Employee} from './employee';
import { Schedule } from './schedule';

export class Project{
    id:string='';
    customer:string='';
    name:string='';
    line:string='';
    domain:string='';
    description:string='';
    updatedAt:Date=new Date();

    technologies:Array<Technology>=new Array<Technology>();
    technolodgyIds:Array<string>=new Array<string>();

    employees:Array<Employee>=new Array<Employee>();

    schedules:Array<Schedule>=new Array<Schedule>();
    version:number=1;

    startdate:Date; //string=new Date().getMonth().toString() + "." + new Date().getFullYear().toString();
    enddate:Date;//=new Date().getMonth().toString() + "." + new Date().getFullYear().toString();

    errorMessage:string="";

    get teamcount(){
        return this.schedules.length.toString();
    }

    get required(){
        return ["name","line","domain","startdate","description"];
    }


    public constructor(init?:Partial<Project>) {
        Object.assign(this, init);
    }
} 