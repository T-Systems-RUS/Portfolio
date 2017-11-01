import { Component, Input, Output,EventEmitter } from '@angular/core';



@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls:  [
      './panel.component.less']
})
export class PanelComponent {


    @Input() itemStyle:string='';
    @Input() panelVisible:boolean=true;
    @Input() panelOpened:boolean=true;

    constructor() {
        
    }
    



}