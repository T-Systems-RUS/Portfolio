import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { ProjectListComponent }    from './project-list/project-list.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'projects', component: ProjectListComponent }
  ])],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}