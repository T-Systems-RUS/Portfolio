import { Component, Input, Output, EventEmitter } from '@angular/core';
import  { Employee }  from './../../../shared/models/employee';
import  { Role }  from './../../../shared/models/role';
import  { Schedule }  from './../../../shared/models/schedule';

import {EmployeeService} from './../employee.service';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'employee-picker',
  templateUrl: './employee-picker.component.html',
  styleUrls:  ['./employee-picker.component.less'],
})
export class EmployeePickerComponent {

    @Input() employees:Array<Employee>=new Array<Employee>();
    @Input() roles:Array<Role>=new Array<Role>();

    @Output() onSelect=new EventEmitter<Array<Schedule>>();

    initialEmployees:Array<Employee>=new Array<Employee>();
    schedules:Array<Schedule>=new Array<Schedule>();

    constructor(private dataService:EmployeeService) {
        
    }

    ngOnInit(){
        if(this.employees.length<=0){ 
            Observable.forkJoin(
                this.dataService.getEmployees(),
                this.dataService.getRoles()
            ).subscribe(data=>{
                this.employees=data[0];
                this.roles=data[1];
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
         this.schedules.push(event);
         this.schedules=Array.from(new Set(this.schedules));
         let selected=this.schedules.filter(item=>item.active);
         this.onSelect.emit(selected);
    }

    stopAction($event){
        $event.stopPropagation();
    }


}

