import {Component, Input} from '@angular/core';

/**
 * Base class/component for any modal window
 * @export
 * @class ModalComponent
 */
@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() color = '';
  @Input() headerColor = 'grey';
  @Input() visible = true;
  @Input() windowStyle = '';

  @Input() fullscreen = false;

}
