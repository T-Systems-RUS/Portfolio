import {Component, Input} from '@angular/core';
import {BACKPANEL_ANIMATION} from './backpanel.animation';

@Component({
  selector: 'backpanel',
  templateUrl: './backpanel.component.html',
  styleUrls: ['./backpanel.component.less'],
  animations: BACKPANEL_ANIMATION
})
export class BackPanelComponent {

  @Input() color = '';
  @Input() image = 'left';
  @Input() withAnimation = false;

}
