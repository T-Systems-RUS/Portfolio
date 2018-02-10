import {Component, Input, EventEmitter, Output} from '@angular/core';
import {ModalComponent} from '../modal.component';

@Component({
  selector: 'delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent extends ModalComponent {

  @Input() type = '';
  @Input() name = '';

  @Output() archieved = new EventEmitter<boolean>();
  @Output() deleted = new EventEmitter<boolean>();

  constructor() {
    super();
  }

  archieve() {
    this.archieved.emit(true);
  }

  delete() {
    this.deleted.emit(true);
  }

  cancel() {
    this.visible = false;
  }

}
