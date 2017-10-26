import { NgModule }           from '@angular/core';
import { SharedModule }       from '../../shared/shared.module';
import { ControlsModule } from '../../controls/controls.module';


import { EmployeeService }           from './employee.service';
import { EmployeeRoutingModule }     from './employee-routing.module';


@NgModule({
  imports:      [ SharedModule, EmployeeRoutingModule, ControlsModule ],
  declarations: [  ],
  providers:    [ EmployeeService ]
})
export class EmployeeModule { }