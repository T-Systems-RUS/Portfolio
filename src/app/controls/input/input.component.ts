import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls:  [
      './input.component.less',
      './../../core/backpanel/backpanel.component.less'
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
    

    constructor() {
        
    }


}
