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

    @Output() archieved=new EventEmitter<boolean>();
    @Output() deleted=new EventEmitter<boolean>();

    constructor() {
        super();
    }

    ngAfterViewInit(){

    }

    archieve(){
        this.archieved.emit(true);
    }

    delete(){
        this.deleted.emit(true);
    }

    cancel(){
        this.visible=false;
    }


}