import { NgModule, Optional, SkipSelf }           from '@angular/core';
import { SharedModule }       from '../shared/shared.module';

/*Control Components */
import { ButtonComponent } from './button/button.component'
import { InputComponent } from './input/input.component'

import { FilterItemComponent } from './filters/filter-item/filter-item.component'
import { FilterPanelComponent } from './filters/filter-panel/filter-panel.component'


@NgModule({
  imports:      [ 
     SharedModule
  ],
  declarations: [
    ButtonComponent,
    InputComponent,
    FilterItemComponent,
    FilterPanelComponent
  ],
  exports:      [ 
    ButtonComponent,
    InputComponent,
    FilterItemComponent,
    FilterPanelComponent
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