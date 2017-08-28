import { Component, Input } from '@angular/core';
import { Employee } from '../../../../shared/models/employee';


@Component({
  selector: 'employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls:  [
      './employee-item.component.less']
})
export class EmployeeItemComponent {

    @Input() model:Employee=new Employee();
    
    
    constructor() {
        
    }
    
    ngAfterViewInit(){

    }
}