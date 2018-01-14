import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { AdminContainerComponent } from './admin-container/admin-container.component';
import { AdminRoleComponent } from './components/admin-role/admin-role.component';
import { AdminTechnologyComponent } from './components/admin-technology/admin-technology.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'admin', component: AdminContainerComponent,children:[
      {
        path: 'technologies',
        component: AdminTechnologyComponent,
        outlet: 'content'
      },
      {
        path: 'roles',
        component: AdminRoleComponent,
        outlet: 'content'
      }] 
    }
  ])],
  exports: [RouterModule]
})
export class AdminRoutingModule {}