import {Role} from './role';
import {Technology} from './technology';
import {Schedule} from './schedule';

export class Employee{
    id:string='';
    firstname:string='';
    lastname:string='';
    active:boolean=false;
    participation:number=0.0;
    schedules:Array<Schedule>=new Array<Schedule>();
    technologies:Array<Technology>=new Array<Technology>();

    get fullname() {
        return this.firstname + " " + this.lastname;
    }

    public constructor(init?:Partial<Employee>) {
        Object.assign(this, init);
    }
} 