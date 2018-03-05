import {Component, Input} from '@angular/core';

@Component({
  selector: 'filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})

export class FilterPanelComponent {

  @Input() id = '';
  @Input() sortProperty = 'name';
}
