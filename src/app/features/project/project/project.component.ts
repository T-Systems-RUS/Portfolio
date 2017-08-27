import { Component, Input } from '@angular/core';
import { Project } from '../../../shared/models/project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls:  [
      './project.component.less']
})
export class ProjectComponent {

    @Input() model:Project=new Project();
    
    
    constructor(private dataService:ProjectService) {
        
    }

    ngOnInit(){
        this.model=this.dataService.generateProject();
    }
    
    ngAfterViewInit(){
        setTimeout(()=> {
            //this.model.description=this.trimText(this.model.description,101);
        }, 0);
        //
    }

}