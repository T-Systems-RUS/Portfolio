export class Technology{
    id:string='';
    name:string='';
    domain:string='';
    active:boolean=false;
    style:string='grey'

    public constructor(init?:Partial<Technology>) {
        Object.assign(this, init);
    }
} 