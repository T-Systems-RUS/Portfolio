import { NgModule }           from '@angular/core';
 import { SharedModule }       from '../shared/shared.module';
import { ControlsModule } from '../controls/controls.module';
import { AdminService } from './admin.service';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { AdminRoleComponent } from './components/admin-role/admin-role.component';
import { AdminTechnologyComponent } from './components/admin-technology/admin-technology.component';



@NgModule({
    imports:      [ AdminRoutingModule, ControlsModule, SharedModule ],
    exports: [],
    declarations: [ 
        AdminContainerComponent,
        AdminTechnologyComponent,
        AdminRoleComponent
     ],
    providers:    [ AdminService ]
  })
  export class AdminModule { }