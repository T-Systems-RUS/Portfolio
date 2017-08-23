import { Component, Input } from '@angular/core';
import { Project } from '../../../shared/models/project';
import { LIST_ANIMATION } from './project-list.animation';


@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls:  [
      './project-list.component.less'],
  animations:LIST_ANIMATION
})
export class ProjectListComponent {

    @Input() projects:Array<Project>=new Array<Project>();
    lines=["automotive", "horizontal", "vertical","sap"];
    domains=["Transportation", "Health", "Telecom","Automotive"];
    
    constructor() {
        this.projects=this.generateProjects();
    }

    generateProjects():Array<Project>{
        let projects=new Array<Project>();

        for(let i=0;i<20;i++){
            let project=new Project({
                name:"Sopre AOM",
                line: i<4 ? this.lines[i] : this.lines[1],
                domain: i<4 ? this.domains[i] : this.domains[2],
                description: "Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online",
                teamcount:i.toString()
            });
            projects.push(project);   
        }

        return projects;
    }
}