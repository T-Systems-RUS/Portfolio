import {Component, Input, Output, EventEmitter} from '@angular/core';

/**
 * Round delete (X) Button
 * @export
 * @class DeleteButtonComponent
 */
@Component({
  selector: 'delete-button',
  styleUrls: [
    './delete.component.scss'
  ],
  template: `
    <button class="delete-button {{style}}" (click)="buttonClicked($event)">{{value}}</button>
  `
})

export class DeleteButtonComponent {

  @Input() value = 'X';
  @Input() style = '';
  @Output() clicked = new EventEmitter<boolean>();

  buttonClicked(event) {
    this.clicked.emit(event);
  }
}
