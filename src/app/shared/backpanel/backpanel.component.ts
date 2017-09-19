import { Component, Input } from '@angular/core';
import { BACKPANEL_ANIMATION } from './backpanel.animation';
import * as Rx from 'rxjs/Rx';


@Component({
  selector: 'backpanel',
  templateUrl: './backpanel.component.html',
  styleUrls:  ['./backpanel.component.less'],
  animations: BACKPANEL_ANIMATION
})
export class BackPanelComponent {

    @Input() color:string='';
    @Input() image:string='left';
    @Input() withAnimation:boolean=false;

    constructor() {
        
    }

    ngAfterViewInit(){

    }


}

