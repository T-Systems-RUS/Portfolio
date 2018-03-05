import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ModalComponent} from '../modal.component';
import {Error} from '../../models/error';

/**
 * Modal window shown on error
 * from server
 * @export
 * @class ErrorComponent
 * @extends {ModalComponent}
 */
@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent extends ModalComponent {

  @Input() error: Error = new Error();
  @Input() action = false;
  @Output() actionPerfomed = new EventEmitter();

  constructor() {
    super();
  }

  performAction() {
    this.actionPerfomed.emit();
  }

}
