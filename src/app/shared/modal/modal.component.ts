import { Component, Input } from '@angular/core';


@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls:  ['./modal.component.less']
})
export class ModalComponent {

    @Input() color:string='';
    @Input() headerColor:string='grey';
    @Input() visible=false;

    @Input() fullscreen:boolean=false;

    constructor() {
        
    }

    ngAfterViewInit(){

    }


}