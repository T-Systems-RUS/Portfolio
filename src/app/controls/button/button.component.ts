import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: [
    './button.component.less',
    './../../shared/backpanel/backpanel.component.less',
    './../input/input.component.less']
})
export class ButtonComponent {

  @Input() value = 'SEARCH';
  @Input() style = '';
  @Input() visible = true;
  @Input() disabled = false;

  @Output() click = new EventEmitter();

  constructor() {

  }

  clicked(event) {
    event.stopPropagation();
    this.click.emit();
  }

}
