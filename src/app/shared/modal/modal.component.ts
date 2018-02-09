import {Component, Input} from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent {

  @Input() color = '';
  @Input() headerColor = 'grey';
  @Input() visible = true;
  @Input() windowStyle = '';

  @Input() fullscreen = false;

}
