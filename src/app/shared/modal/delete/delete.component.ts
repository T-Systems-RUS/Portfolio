import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { Error } from '../../../shared/models/error';

@Component({
  selector: 'delete',
  templateUrl: './delete.component.html',
  styleUrls:  ['./delete.component.less']
})
export class DeleteComponent extends ModalComponent {

    @Input() type:string='';
    @Input() name:string='';

    @Output() confirmed=new EventEmitter<boolean>();

    constructor() {
        super();
    }

    ngAfterViewInit(){

    }

    confirm(){
        this.confirmed.emit(true);
    }

    cancel(){
        console.log('erre')
        this.hide();
    }


}