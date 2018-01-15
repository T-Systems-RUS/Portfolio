import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as Rx from 'rxjs/Rx';
import { Inplace } from 'primeng/primeng';

@Component({
  selector: 'delete-button',
  styleUrls:  [
    './delete.component.less'
  ],
  template: `
    <button class="delete-button {{style}}" (click)="buttonClicked($event)">{{value}}</button>
  `
 

})

export class DeleteButtonComponent  {

    @Input() value:string="X";
    @Input() style:string='';
    @Output() clicked=new EventEmitter<boolean>();

    constructor() {
        
    }

    buttonClicked(event){
        this.clicked.emit(event);
    }


}