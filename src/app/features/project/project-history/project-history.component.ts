import { Component, Input, Output,EventEmitter,ViewChildren,QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../../../shared/models/project';
import { PROJECT_ANIMATION } from '../project/project.animation';
import { ProjectService } from '../project.service';

import { ProjectModalComponent } from '../project-modal/project-modal.component';



@Component({
  selector: 'project-history',
  templateUrl: './project-history.component.html',
  styleUrls:  [
      './project-history.component.less',
      '../project/project.component.less'],
  animations:PROJECT_ANIMATION
})
export class ProjectHistoryComponent {

    @Input() model:Project=new Project();
    @Input() projects:Array<Project>=new Array<Project>();
    @Input() itemStyle:string='';

    versions:Array<number>=new Array<number>();

    @ViewChildren(ProjectModalComponent) divs: QueryList<ProjectModalComponent>
    
    constructor(private dataService:ProjectService,
                private route: ActivatedRoute) {        
    }

    ngOnInit(){
        this.route.params.subscribe(params=>{
            if(params['name']){
                this.model.name=params['name'];
                this.model.line="automotive";
                this.model.domain="Sales and aftersales";
                this.dataService.getProjectsByName(params['name']).subscribe(data=>{
                    this.projects=data;
                    this.versions=this.projects.map(p=>p.version);
                    console.log(this.projects);
                    console.log(this.divs);
                })
            } else{
                
            }
            
        },error=>{
            console.log('fuck',error)
        }) 

    }
    
    onChange(event,project){
        console.log(event,project)

        console.log(this.divs.map(i=>{
            console.log(i)
            return i;
        }))
    }



}