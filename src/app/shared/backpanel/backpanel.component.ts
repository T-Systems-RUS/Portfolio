import {Component, Input} from '@angular/core';

/**
 * Backpanel with different images
 * 
 * @export
 * @class BackPanelComponent
 */
@Component({
  selector: 'backpanel',
  templateUrl: './backpanel.component.html',
  styleUrls: ['./backpanel.component.scss']
})
export class BackPanelComponent {

  @Input() color = 'grey';
  // both - 2 images | left side | right side
  @Input() image = 'left';

}
