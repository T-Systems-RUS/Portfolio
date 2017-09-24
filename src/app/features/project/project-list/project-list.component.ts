import { Component, Input, ViewChild } from '@angular/core';
import { Project } from '../../../shared/models/project';
import { Employee } from '../../../shared/models/employee';
import { Technology } from '../../../shared/models/technology';
import { ProjectService } from '../project.service';
import { LIST_ANIMATION } from './project-list.animation';

import { ModalComponent } from '../../../shared/modal/modal.component';


@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls:  [
      './project-list.component.less'],
  animations:LIST_ANIMATION
})

export class ProjectListComponent {

    @Input() projects:Array<Project>=new Array<Project>();
    @Input() sortOrder:boolean=true;

    filteredProjects:Array<Project>=new Array<Project>();

    tooltipVisible:boolean=false;
    complete:Array<string>=new Array<string>();

    //initial project list
    initialProjects:Array<Project>=new Array<Project>();
    //initial employee list
    initialEmployees:Array<Employee>=new Array<Employee>();
    //initial tech list
    initialTechnologies:Array<Technology>=new Array<Technology>();

    @ViewChild(ModalComponent)
    private readonly modal:ModalComponent;

    //Options for new Project form
    private model:Project=new Project();
    private options:Array<string>=["automotive","horizontal","sap","vertical"]
    private options2:Array<string>=["telekom","automotive","transportation","health"]

    constructor(private dataService:ProjectService) {
        this.projects=this.dataService.generateProjects();
        this.initialProjects=this.projects;
        this.complete=Array.from(new Set(this.projects.map(item=>item.name)));
    }

    ngOnInit(){
        this.model.line='grey'; 
        this.model.employees=this.dataService.generateEmployees();
        this.initialEmployees=this.model.employees;
        this.model.technologies=this.dataService.technologies;
        this.initialTechnologies=this.model.technologies;
    }

    ngAfterViewInit(){
        setTimeout(()=> {
            this.filteredProjects=this.projects;
              
        }, 0); 

        
    }

    onFilterAction(event){
        // switch(event){
        //     case 'sort':
        //     let sorted$ = this.projects.sort(this.sortByName);
        //     break;
        // }
        // for(let pr of this.projects){
        //     console.log(Object.keys(pr));
        // }
        this.projects.sort(this.propComparator(event));
        this.tooltipVisible=false;
        console.log(this.tooltipVisible)
    }

    propComparator(prop) {
        return function(a, b) {
            //console.log(a[prop],b[prop],prop,a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1)
            return a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1;
        }
    }

    sortByName(a,b) {
       
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;

        
      }

      filterProjects(event){
        this.projects=this.initialProjects;
        this.projects=this.projects.filter(item=>item.name.toLowerCase().indexOf(event.toLowerCase())!=-1);
      }

      filterEmployees(event){
        this.model.employees=this.initialEmployees;
        this.model.employees=this.model.employees.filter(item=>item.fullname.toLowerCase().indexOf(event.toLowerCase())!=-1);
      }

      filterTechnologies(event){
          
        this.model.technologies=this.initialTechnologies;
        this.model.technologies=this.model.technologies.filter(item=>item.name.toLowerCase().indexOf(event.toLowerCase())!=-1);
      }

      selectTechnology(event){
          let tech=this.initialTechnologies.filter(item=>item.name===event)[0];
          tech.active=!tech.active;
      }


      changeLine(event){
          this.model.line=event;
      }

      
}