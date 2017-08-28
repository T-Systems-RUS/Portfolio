export class Technology{
    id:string='';
    name:string='';
    domain:string='';

    public constructor(init?:Partial<Technology>) {
        Object.assign(this, init);
    }
} 