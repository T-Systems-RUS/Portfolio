import { Component, Input } from '@angular/core';
import { Project } from '../../../shared/models/project';
import { Technology } from '../../../shared/models/technology';
import {Employee } from '../../../shared/models/employee';
import { ProjectService } from '../project.service';


@Component({
  selector: 'new-project',
  templateUrl: './new-project.component.html',
  styleUrls:  [
      './new-project.component.less'],
  animations: []
})
export class NewProjectComponent {

    @Input() model:Project=new Project();
    
    //initial employee list
    initialEmployees:Array<Employee>=new Array<Employee>();
    //initial tech list
    initialTechnologies:Array<Technology>=new Array<Technology>();

    private options:Array<string>=["automotive","horizontal","sap","vertical"]
    private options2:Array<string>=["telekom","automotive","transportation","health"]
    
    constructor(private dataService:ProjectService) {
        
    }

    ngOnInit(){
        this.model.line='grey'; 
        this.model.employees=this.dataService.generateEmployees();
        this.initialEmployees=this.model.employees;
        this.model.technologies=this.dataService.technologies;
        this.initialTechnologies=this.model.technologies;
    }
    
    filterEmployees(event){
        this.model.employees=this.initialEmployees;
        console.log(this.model.employees,this.initialEmployees)
        this.model.employees=this.model.employees.filter(item=>
            item.fullname.toLowerCase().indexOf(event.toLowerCase())!=-1 || 
            item.roles[0].name.toLowerCase().indexOf(event.toLowerCase())!=-1
        );
      }

      filterTechnologies(event){
          
        this.model.technologies=this.initialTechnologies;
        this.model.technologies=this.model.technologies.filter(item=>item.name.toLowerCase().indexOf(event.toLowerCase())!=-1);
      }

      selectTechnology(event){
          let tech=this.initialTechnologies.filter(item=>item.name===event)[0];
          tech.active=!tech.active;
      }

      selectEmployee(event){
        let employee=this.initialEmployees.filter(item=>item.fullname===event.fullname)[0];
        employee.active=event.active;
      }


      changeLine(event){
          this.model.line=event;
      }

      back(){
          window.history.back();
      }

      stopAction($event){
          $event.stopPropagation();
      }

}