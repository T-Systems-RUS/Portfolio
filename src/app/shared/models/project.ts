

export class Project{
    id:string='';
    name:string='';
    line:string='';
    domain:string='';
    description:string='';
    teamcount:string='0';
    dateModified:string=new Date().toDateString();

    public constructor(init?:Partial<Project>) {
        Object.assign(this, init);
    }
} 