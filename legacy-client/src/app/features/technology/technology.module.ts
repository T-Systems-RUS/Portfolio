import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ControlsModule} from '../../controls/controls.module';

import {TechnologyService} from './technology.service';
import {TechnologyRoutingModule} from './technology-routing.module';

// components
import {TechnologyPickerComponent} from './technology-picker/technology-picker.component';

@NgModule({
  imports: [SharedModule, TechnologyRoutingModule, ControlsModule],
  exports: [TechnologyPickerComponent],
  declarations: [TechnologyPickerComponent],
  providers: [TechnologyService]
})
export class TechnologyModule {
}
