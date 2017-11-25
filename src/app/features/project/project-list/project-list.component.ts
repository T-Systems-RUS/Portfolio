import { Component, Input, ViewChild } from '@angular/core';
import { Project } from '../../../shared/models/project';
import { Employee } from '../../../shared/models/employee';
import { Technology } from '../../../shared/models/technology';
import { Constants } from '../../../shared/models/constants';
import { ProjectService } from '../project.service';
import { LIST_ANIMATION } from './project-list.animation';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operator/retry';



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

    tooltipVisible:boolean=true;
    complete:Array<string>=new Array<string>();

    //initial project list
    initialProjects:Array<Project>=new Array<Project>();

    //constants
    constants=new Constants();
    //filter checkboxes
    line=new Array<string>();
    type=new Array<string>();
    program=new Array<string>();
    domain=new Array<string>();
    technologies=new Array<Technology>();

    filter:any=new Object();

    constructor(private dataService:ProjectService,public router: Router) {
        // this.projects=this.dataService.generateProjects();
        // this.initialProjects=this.projects;
        // this.complete=Array.from(new Set(this.projects.map(item=>item.name)));
    }

    ngOnInit(){
        this.dataService.getConstants().subscribe(res=>{
            this.constants.lines=res.lines;
            this.constants.domains=res.domains;
            this.constants.types=res.types;
            this.constants.programs=res.programs;
        },error=>{
            console.log(error);
        });

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

      filterProjects(event){
        this.projects=this.initialProjects;
        this.projects=this.projects.filter(item=>item.name.toLowerCase().indexOf(event.toLowerCase())!=-1);
        this.complete=this.projects.map(item=>item.name);
      }

      newProject(){
          this.router.navigate(["/project/new"]);
      }

      check($event,name){
          if(this[name]){
            this.filter[name]=this[name];
            this.complexFilter();
          }
      }

      complexFilter(){
          this.projects=this.initialProjects;
          
          for(let key of Object.keys(this.filter)){
            this.projects=this.projects.filter(item=>{
                return this.filter[key].length 
                    ? this.filter[key].indexOf(item[key])>-1
                    : item;
                //if(this.filter[key].indexOf(item[key])>-1) return item;
                //else if(!this.filter[key].length) return item;
            })
          }
          
      }

      filterByTechnology(technologies){
            let ids=technologies.map(item=>item.id);
            this.projects=this.initialProjects;
            this.projects=this.projects.filter(item=>{
                return item.technologies.map(item=>item.id).filter(function (elem) {
                    return ids.indexOf(elem) > -1;
                }).length == ids.length
            })

            console.log(this.projects) 
      }
}