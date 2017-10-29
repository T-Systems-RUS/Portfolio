import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls:  [
      './dropdown.component.less'
    ]
})

export class DropDownComponent {

    @Input() id:string='';
    @Input() name:string='';
    @Input() model:string='';
    @Input() label:string='';
    @Input() wrapperStyle='';
    @Input() labelStyle='';

    @Input() options:Array<string>=new Array<string>();
    @Input() errorMessage:string=""; //Field is required

    @Output() private changed:EventEmitter<string>=new EventEmitter<string>();
    

    constructor() {
        
    }

    ngOnInit(){
        console.log(this.model)
    }

    modelChanged(event){
        this.errorMessage='';
        this.changed.emit(event);
    }


}