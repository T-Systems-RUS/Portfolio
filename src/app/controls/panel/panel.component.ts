import {Component, Input} from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less']
})
export class PanelComponent {

  @Input() itemStyle = '';
  @Input() panelVisible = true;
  @Input() panelOpened = true;
}
