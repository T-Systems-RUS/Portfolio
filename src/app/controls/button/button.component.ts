import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls:  [
      './button.component.less',
      './../../core/backpanel/backpanel.component.less',
      './../input/input.component.less']
})
export class ButtonComponent {

    @Input() value:string='SEARCH';
    @Input() style:string='';
    @Input() visible:boolean=true;
    
    constructor() {
        
    }


}