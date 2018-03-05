import {Component, Input, Output, EventEmitter} from '@angular/core';

/**
 * Unfinished
 * @export
 * @class CheckBoxComponent
 */
@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: [
    './checkbox.component.scss']
})
export class CheckBoxComponent {

  @Input() model = false;
  @Input() label = '';
  @Input() name = '';
  @Input() style = '';
  @Input() visible = true;
  @Input() labelStyle = '';
  @Input() boxStyle = '';

  @Output() checked = new EventEmitter();

  check(event) {
    this.checked.emit();
  }

}
