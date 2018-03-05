import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ControlsModule} from '../../controls/controls.module';

import {EmployeeService} from './employee.service';
import {EmployeeRoutingModule} from './employee-routing.module';

// components
import {EmployeePickerComponent} from './employee-picker/employee-picker.component';

@NgModule({
  imports: [SharedModule, EmployeeRoutingModule, ControlsModule],
  exports: [EmployeePickerComponent],
  declarations: [EmployeePickerComponent],
  providers: [EmployeeService]
})
export class EmployeeModule {
}
