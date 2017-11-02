import { Component, Input } from '@angular/core';
import { Project } from '../../../shared/models/project';


@Component({
  selector: 'project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls:  [
      './project-modal.component.less']
})
export class ProjectModalComponent {

    @Input() project:Project=new Project();
    @Input() compareProject:Project;

    validator={};
    
    constructor() {
        
    }

    ngOnInit(){
        if(this.compareProject){
            this.compareProjects(this.project,this.compareProject);
        }
    }

    compareProjects(project1,project2){
        if(Object.keys(project1).length===Object.keys(project2).length){
            for(let key of Object.keys(project1)){
                if(project1.version>project2.version){
                    if(project1[key] && !project2[key]){
                        this.validator[key]='project-modal--added'
                    } else if(!project1[key] && project2[key]){
                        this.validator[key]=''
                    } else if(project1[key]!==project2[key]){
                        this.validator[key]='project-modal--edited'
                    } else{
                        this.validator[key]=''
                    }
                } else{
                    if(project1[key] && !project2[key]){
                        this.validator[key]='project-modal--removed'
                    } else if(!project1[key] && project2[key]){
                        this.validator[key]=''
                    } else if(project1[key]!==project2[key]){
                        this.validator[key]='project-modal--edited'
                    } else{
                        this.validator[key]=''
                    }
                }
            }
        }
    }
    
}