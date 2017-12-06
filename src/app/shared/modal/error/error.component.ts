import { Component, Input,Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { Error } from '../../../shared/models/error';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls:  ['./error.component.less']
})
export class ErrorComponent extends ModalComponent {

    @Input() error:Error=new Error();
    @Input() action:boolean=false;
    @Output() actionPerfomed=new EventEmitter();

    constructor() {
        super();
    }

    performAction(){
        this.actionPerfomed.emit();
    }


}