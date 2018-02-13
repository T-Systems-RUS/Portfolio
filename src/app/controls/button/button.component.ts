import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: [
    './button.component.scss',
    './../../shared/backpanel/backpanel.component.scss',
    './../input/input.component.scss']
})
export class ButtonComponent {

  @Input() value = 'SEARCH';
  @Input() style = '';
  @Input() visible = true;
  @Input() disabled = false;

  @Output() click = new EventEmitter();

  clicked(event) {
    event.stopPropagation();
    this.click.emit();
  }

}
