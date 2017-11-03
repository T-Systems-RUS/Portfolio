import { NgModule }           from '@angular/core';
import { SharedModule }       from '../../shared/shared.module';
import { ControlsModule } from '../../controls/controls.module';
import {EmployeeModule } from './../employee/employee.module';
import { TechnologyModule } from './../technology/technology.module';

import { ProjectItemComponent }     from './project-item/project-item.component';
import { ProjectListComponent }     from './project-list/project-list.component';
import { ProjectComponent }         from './project/project.component';
import { ProjectConfirmationComponent } from './project-modal/project-confirmation/project-confirmation.component';
import { ProjectHistoryComponent }         from './project-history/project-history.component';
import { ProjectModalComponent }         from './project-modal/project-modal.component';
import { ProjectService }           from './project.service';
import { ProjectRoutingModule }     from './project-routing.module';
import { NewProjectComponent }      from './new-project/new-project.component';




@NgModule({
  imports:      [ SharedModule, ProjectRoutingModule, ControlsModule,EmployeeModule,TechnologyModule ],
  declarations: [ 
    ProjectItemComponent, 
    ProjectListComponent, 
    ProjectComponent,
    ProjectConfirmationComponent,
    NewProjectComponent, 
    ProjectHistoryComponent,
    ProjectModalComponent 
  ],
  providers:    [ ProjectService ],
  entryComponents:[ProjectConfirmationComponent]
})
export class ProjectModule { }