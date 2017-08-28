

export class Project{
    id:string='';
    customer:string='';
    name:string='';
    line:string='';
    domain:string='';
    description:string='';
    teamcount:string='0';
    dateModified:string=new Date().toDateString();


    start:string=new Date().getMonth().toString() + "." + new Date().getFullYear().toString();
    end:string=new Date().getMonth().toString() + "." + new Date().getFullYear().toString();

    public constructor(init?:Partial<Project>) {
        Object.assign(this, init);
    }
} 