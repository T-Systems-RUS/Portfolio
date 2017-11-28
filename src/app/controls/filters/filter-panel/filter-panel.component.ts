import { Component, Input } from '@angular/core';
import { FilterItemComponent } from '../filter-item/filter-item.component';

import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls:  [
      './filter-panel.component.less'
    ]

})

export class FilterPanelComponent  {

    @Input() id:string='';
    @Input() sortProperty:string='name';



    constructor() {
        
    }


}