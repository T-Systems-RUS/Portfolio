import { NgModule }           from '@angular/core';
import { SharedModule }       from '../../shared/shared.module';
import { ControlsModule } from '../../controls/controls.module';
import {EmployeeModule } from './../employee/employee.module';
import { TechnologyModule } from './../technology/technology.module';

import { ProjectItemComponent }     from './project-item/project-item.component';
import { ProjectListComponent }     from './project-list/project-list.component';
import { ProjectComponent }         from './project/project.component';
import { ProjectService }           from './project.service';
import { ProjectRoutingModule }     from './project-routing.module';
import { NewProjectComponent }      from './new-project/new-project.component';
import { ProjectFormComponent }     from './project-form/project-form.component';



@NgModule({
  imports:      [ SharedModule, ProjectRoutingModule, ControlsModule,EmployeeModule,TechnologyModule ],
  declarations: [ ProjectItemComponent, ProjectListComponent, ProjectComponent,NewProjectComponent,ProjectFormComponent ],
  providers:    [ ProjectService ]
})
export class ProjectModule { }