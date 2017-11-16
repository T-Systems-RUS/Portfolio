import { Component, Input, ViewChild } from '@angular/core';
import { Project } from '../../../shared/models/project';
import { Employee } from '../../../shared/models/employee';
import { Technology } from '../../../shared/models/technology';
import { ProjectService } from '../project.service';
import { LIST_ANIMATION } from './project-list.animation';
import { Router } from '@angular/router';



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







    constructor(private dataService:ProjectService,public router: Router) {
        // this.projects=this.dataService.generateProjects();
        // this.initialProjects=this.projects;
        // this.complete=Array.from(new Set(this.projects.map(item=>item.name)));
    }

    ngOnInit(){
        this.dataService.getProjects().subscribe(data=>{
            this.projects=data;
            this.projects.forEach(item=>item.teamcount=item.schedules.length);
            console.log(this.projects);
            
            this.initialProjects=this.projects;
            this.complete= Array.from(new Set(this.projects.map(item=>item.name)));//

        },err=>{
            console.log(err);
        })
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
        this.complete=this.projects.map(item=>item.name);
      }

      newProject(){
          this.router.navigate(["/project/new"]);
      }

      
}