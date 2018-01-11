import { NgModule }           from '@angular/core';
import { SharedModule }       from '../shared/shared.module';
import { ControlsModule } from '../controls/controls.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminContainerComponent } from './admin-container/admin-container.component';

@NgModule({
    imports:      [ AdminRoutingModule,SharedModule, ControlsModule ],
    exports: [],
    declarations: [ 
        AdminContainerComponent
     ],
    providers:    [  ]
  })
  export class AdminModule { }