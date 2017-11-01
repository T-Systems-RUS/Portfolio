import { Component, Input } from '@angular/core';
import { Project } from '../../../shared/models/project';


@Component({
  selector: 'project-item',
  templateUrl: './project-item.component.html',
  styleUrls:  [
      './project-item.component.less']
})
export class ProjectItemComponent {

    @Input() model:Project=new Project();
    
    
    constructor() {
        
    }
    
    ngAfterViewInit(){
        setTimeout(()=> {
            this.model.description=this.trimText(this.model.description,101);
        }, 0);
        //
    }

    trimText(string, limit)
        {
            return string.length > limit ? string.substring(0,limit) + "..." : string;
        }

}