import {Component, Input} from '@angular/core';

@Component({
  selector: 'backpanel',
  templateUrl: './backpanel.component.html',
  styleUrls: ['./backpanel.component.scss']
})
export class BackPanelComponent {

  @Input() color = '';
  @Input() image = 'left';
  @Input() withAnimation = false;

}
