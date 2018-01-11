import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { AdminContainerComponent } from './admin-container/admin-container.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'admin', component: AdminContainerComponent }
  ])],
  exports: [RouterModule]
})
export class AdminRoutingModule {}