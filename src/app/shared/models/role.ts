export class Role{
    id:string='';
    name:string='';
    participation:string='';
    leadrole:boolean=false;

    public constructor(init?:Partial<Role>) {
        Object.assign(this, init);
    }
} 