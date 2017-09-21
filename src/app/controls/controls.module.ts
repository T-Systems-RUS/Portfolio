import { NgModule, Optional, SkipSelf }           from '@angular/core';
import { SharedModule }       from '../shared/shared.module';

/*Control Components */
import { ButtonComponent } from './button/button.component';
import { CheckBoxComponent } from './checkbox/checkbox.component';
import { InputComponent }  from './input/input.component';
import { DropDownComponent }  from './dropdown/dropdown.component';
import { ChipComponent }   from './chip/chip.component';

import { FilterItemComponent } from './filters/filter-item/filter-item.component';
import { FilterPanelComponent } from './filters/filter-panel/filter-panel.component';

import { ListItemComponent } from './list/list-item/list-item.component';


@NgModule({
  imports:      [ 
     SharedModule
  ],
  declarations: [
    ButtonComponent,
    CheckBoxComponent,
    ChipComponent,
    InputComponent,
    DropDownComponent,
    FilterItemComponent,
    FilterPanelComponent,
    ListItemComponent
  ],
  exports:      [ 
    ButtonComponent,
    CheckBoxComponent,
    ChipComponent,
    InputComponent,
    DropDownComponent,
    FilterItemComponent,
    FilterPanelComponent,
    ListItemComponent
  ],
  providers:    [ 
    
  ]
})
export class ControlsModule {
  constructor (@Optional() @SkipSelf() parentModule: ControlsModule) {
    if (parentModule) {
      throw new Error(
        'ControlsModule is already loaded. Import it in the AppModule only');
    }
  }
}