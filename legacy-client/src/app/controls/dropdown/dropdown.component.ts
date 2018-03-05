import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: [
    './dropdown.component.scss'
  ]
})

export class DropDownComponent {

  @Input() id = '';
  @Input() name = '';
  @Input() model = '';
  @Input() label = '';
  @Input() wrapperStyle = '';
  @Input() labelStyle = '';

  @Input() options: string[] = [];
  @Input() errorMessage = ''; // Field is required

  @Output() private changed: EventEmitter<string> = new EventEmitter<string>();

  modelChanged(event) {
    this.errorMessage = '';
    this.changed.emit(event);
  }

}
