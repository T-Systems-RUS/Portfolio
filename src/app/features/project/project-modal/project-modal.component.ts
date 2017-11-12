import { Component, Input } from '@angular/core';
import { Project } from '../../../shared/models/project';
import * as _ from "lodash";


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
    id:string;
    
    constructor() {
        
    }

    ngOnInit(){
        if(this.compareProject){
            this.compareProjects(this.project,this.compareProject);
        }
        
        this.id=this.project.id;
        console.log(this.project);
    }

    ngAfterViewInit(){
       
    }

    compareProjects(project1,project2){
        if(Object.keys(project1).length===Object.keys(project2).length){
            for(let key of Object.keys(project1)){
                if(Array.isArray(project1[key]) && (key==='technologies' || key==='schedules')){
                    //added
                    let diff1=_.differenceBy(project1[key],project2[key],'name');
                    //removed
                    let diff2=_.differenceBy(project2[key],project1[key],'name');

                    if(diff1.length>0){
                        diff1.forEach(element => {
                            this.validator[key+element.id]='chip--edited';
                        });               
                    } else if(diff2.length>0){
                        diff2.forEach(element => {
                            this.validator[key+element.id]='chip--edited';
                        });
                    } else{

                    }

                    console.log(project1.version,project2.version,diff1,diff2);
                    console.log(key)
                }
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