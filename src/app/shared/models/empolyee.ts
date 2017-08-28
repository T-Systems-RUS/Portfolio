import {Role} from './role'

export class Employee{
    id:string='';
    firstname:string='';
    lastname:string='';
    roles:Array<Role>=new Array<Role>();

    public constructor(init?:Partial<Employee>) {
        Object.assign(this, init);
    }
} 