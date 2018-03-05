import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectComponent} from './project/project.component';
import {NewProjectComponent} from './new-project/new-project.component';
import {ProjectHistoryComponent} from './project-history/project-history.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: 'projects', component: ProjectListComponent},
    {path: 'project/new', component: NewProjectComponent},
    {path: 'project/history/:name', component: ProjectHistoryComponent},
    {path: 'project/update/:id', component: NewProjectComponent},
    {path: 'project/copy/:id', component: NewProjectComponent},
    {path: 'project/:id', component: ProjectComponent}
  ])],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
