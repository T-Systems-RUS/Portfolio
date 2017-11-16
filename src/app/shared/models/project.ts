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

    //new props
    pss:number=0.0;
    feedback:string="";
    program:string="";
    type:string="";

    technologies:Array<Technology>=new Array<Technology>();
    technolodgyIds:Array<string>=new Array<string>();

    employees:Array<Employee>=new Array<Employee>();

    schedules:Array<Schedule>=new Array<Schedule>();
    version:number=1;
    teamcount:number=0;
    startdate:Date;
    enddate:Date;

    errors:Object={};


    required:Array<string>;

    generateErrors(unvalidFields:Array<string>){
        this.errors={};
        unvalidFields.map(field=>{
            this.errors[field]=`${field} is required`;
        });
    }




    public constructor(init?:Partial<Project>) {
        Object.assign(this, init);
        this.errors={};
        this.required=["name","line","domain","startdate","description","type","program"];
    }
} 