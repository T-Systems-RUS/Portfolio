import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls:  [
      './input.component.less',
      './../../shared/backpanel/backpanel.component.less'
    ]
})

export class InputComponent {

    @Input() id:string='';
    @Input() name:string='';
    @Input() model:string='';
    @Input() label:string='';
    @Input() wrapperStyle='';
    @Input() labelStyle='';
    @Input() boxStyle='';
    @Input() placeholder:string=''
    @Input() withButton:boolean=true;
    @Input() complete:Array<any>=new Array<any>();

    completeInitial:Array<any>=new Array<any>();

    constructor() {
        
    }

    ngAfterViewInit(){
        this.completeInitial=this.complete;
    }


    modelChanged(event){
        this.complete=this.completeInitial;
        this.complete=this.complete.filter(item=>item.toLowerCase().indexOf(event.toLowerCase())!=-1);
    }

    completeClick(data){
        console.log(data);
        this.model=data;
    }

}
