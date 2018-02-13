import {Component, Input, EventEmitter, Output} from '@angular/core';
import {ModalComponent} from '../modal.component';

/**
 * Prompts before delete item
 * @export
 * @class DeleteComponent
 * @extends {ModalComponent}
 */
@Component({
  selector: 'delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent extends ModalComponent {

  // type of item to be deleted interpolated ins string
  @Input() type = '';
  // name of item to be deleted
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
