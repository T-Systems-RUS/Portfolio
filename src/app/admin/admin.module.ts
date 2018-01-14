import { NgModule }           from '@angular/core';
// import { SharedModule }       from '../shared/shared.module';
import { ControlsModule } from '../controls/controls.module';
import { TechnologyModule } from './../features/technology/technology.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { AdminRoleComponent } from './components/admin-role/admin-role.component';
import { AdminTechnologyComponent } from './components/admin-technology/admin-technology.component';

import { SharedModule } from 'primeng/primeng';

@NgModule({
    imports:      [ AdminRoutingModule, ControlsModule, TechnologyModule ],
    exports: [],
    declarations: [ 
        AdminContainerComponent,
        AdminTechnologyComponent,
        AdminRoleComponent
     ],
    providers:    [  ]
  })
  export class AdminModule { }