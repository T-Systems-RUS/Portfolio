import { Component, Input, Output, EventEmitter } from '@angular/core';
import  { Employee }  from './../../../shared/models/employee';

import {EmployeeService} from './../employee.service';

@Component({
  selector: 'employee-picker',
  templateUrl: './employee-picker.component.html',
  styleUrls:  ['./employee-picker.component.less'],
})
export class EmployeePickerComponent {

    @Input() employees:Array<Employee>=new Array<Employee>();
    @Output() onSelect=new EventEmitter<Array<Employee>>();

    initialEmployees:Array<Employee>=new Array<Employee>();

    constructor(private dataService:EmployeeService) {
        
    }

    ngOnInit(){
        if(this.employees.length<=0){
            this.dataService.getEmployees().subscribe(data=>{
                this.employees=data;
                this.initialEmployees=this.employees;
            }, error=>{
                console.log(error);
            })
        }
    }

    filterEmployees(event){
        this.employees=this.initialEmployees;
        console.log(this.employees,this.initialEmployees)
        this.employees=this.employees.filter(item=>
            (item.firstname + ' ' + item.lastname).toLowerCase().indexOf(event.toLowerCase())!=-1 //|| 
            //tem.roles[0].name.toLowerCase().indexOf(event.toLowerCase())!=-1
        );
    }

    selectEmployee(event){
        let employee=this.initialEmployees.filter(item=>item.id===event.id)[0];
        employee.active=event.active;

        let selected=this.employees.filter(item=>item.active);
        this.onSelect.emit(selected);
    }

    stopAction($event){
        $event.stopPropagation();
    }


}

