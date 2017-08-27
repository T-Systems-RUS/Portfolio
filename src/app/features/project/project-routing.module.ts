import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { ProjectListComponent }    from './project-list/project-list.component';
import { ProjectComponent }    from './project/project.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'projects', component: ProjectListComponent },
    { path: 'project/:id', component: ProjectComponent }
  ])],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}