import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls:  [
      './checkbox.component.less']
})
export class CheckBoxComponent {

    @Input() model:boolean=false;
    @Input() label:string='';
    @Input() name:string='';
    @Input() style:string='';
    @Input() visible:boolean=true;
    @Input() labelStyle:string='';
    @Input() boxStyle:string='';

    @Output() checked=new EventEmitter();
    
    constructor() {
        
    }

    check(event){
        this.checked.emit();
    }


}