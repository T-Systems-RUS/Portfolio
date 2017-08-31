import {Role} from './role'
import {Technology} from './technology'

export class Employee{
    id:string='';
    firstname:string='';
    lastname:string='';
    roles:Array<Role>=new Array<Role>();
    technologies:Array<Technology>=new Array<Technology>();

    get fullname() {
        return this.firstname + " " + this.lastname;
    }

    public constructor(init?:Partial<Employee>) {
        Object.assign(this, init);
    }
} 