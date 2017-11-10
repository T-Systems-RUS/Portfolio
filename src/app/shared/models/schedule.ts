import {Employee} from './employee';
import {Role} from './role'
import {Project} from './project';


export class Schedule {
    id:string='';
    participation: number=0.0;
    startdate: Date= new Date();
    enddate: Date;
    active:boolean=false;

    project:Project=new Project();
    employee:Employee=new Employee();
    role:Role=new Role();

    public constructor(init?:Partial<Schedule>) {
        Object.assign(this, init);
    }
} 