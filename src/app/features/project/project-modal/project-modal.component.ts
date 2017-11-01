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
    
    
    constructor() {
        
    }
    
}