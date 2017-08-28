import { Component, Input } from '@angular/core';

@Component({
  selector: 'chip',
  templateUrl: './chip.component.html',
  styleUrls:  [
      './chip.component.less'
    ]
})
export class ChipComponent {

    @Input() value:string='';
    @Input() style:string='';
    
    constructor() {
        
    }


}