export class Technology{
    id:string='';
    name:string='';
    domain:string='';
    active:boolean=false;

    image:string='';
    version:string='';

    public constructor(init?:Partial<Technology>) {
        Object.assign(this, init);
    }
} 