import {Component, Input} from '@angular/core';

/**
 * Marks project as finished
 * @export
 * @class RibbonComponent
 */
@Component({
  selector: 'ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.scss']
})
export class RibbonComponent {

  @Input() style = '';
  @Input() text = '';
  @Input() date: Date;

  @Input() visible = false;
}
