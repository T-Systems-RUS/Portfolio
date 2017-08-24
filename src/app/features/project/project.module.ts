import { NgModule }           from '@angular/core';
import { SharedModule }       from '../../shared/shared.module';
import { ControlsModule } from '../../controls/controls.module';

import { ProjectItemComponent }     from './project-item/project-item.component';
import { ProjectListComponent }     from './project-list/project-list.component';
import { ProjectService }       from './project.service';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  imports:      [ SharedModule, ProjectRoutingModule, ControlsModule ],
  declarations: [ ProjectItemComponent, ProjectListComponent ],
  providers:    [ ProjectService ]
})
export class ProjectModule { }