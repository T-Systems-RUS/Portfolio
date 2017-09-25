import { NgModule }           from '@angular/core';
import { SharedModule }       from '../../shared/shared.module';
import { ControlsModule } from '../../controls/controls.module';

import { ProjectItemComponent }     from './project-item/project-item.component';
import { ProjectListComponent }     from './project-list/project-list.component';
import { ProjectComponent }     from './project/project.component';
import { ProjectService }       from './project.service';
import { ProjectRoutingModule } from './project-routing.module';
import { NewProjectComponent } from './new-project/new-project.component';


@NgModule({
  imports:      [ SharedModule, ProjectRoutingModule, ControlsModule ],
  declarations: [ ProjectItemComponent, ProjectListComponent, ProjectComponent,NewProjectComponent ],
  providers:    [ ProjectService ]
})
export class ProjectModule { }