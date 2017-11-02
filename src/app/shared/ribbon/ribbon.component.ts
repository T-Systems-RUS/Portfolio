import { Component, Input } from '@angular/core';



@Component({
  selector: 'ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls:  ['./ribbon.component.less']
})
export class RibbonComponent {

    @Input() style:string='';
    @Input() text:string='';

    constructor() {
        
    }



}