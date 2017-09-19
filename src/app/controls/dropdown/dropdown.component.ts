import { Component, Input } from '@angular/core';

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
    

    constructor() {
        
    }


}