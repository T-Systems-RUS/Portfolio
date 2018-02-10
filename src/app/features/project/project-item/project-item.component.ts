import {Component, Input, AfterViewInit} from '@angular/core';
import {Project} from '../../../shared/models/project';

@Component({
  selector: 'project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements AfterViewInit {

  @Input() model: Project = new Project();
  description = '';

  ribbonVisible = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.description = this.trimText(this.model.description, 101);
      if (this.model.enddate) {
        this.ribbonVisible = new Date(this.model.enddate) <= new Date();
      }
    }, 0);
    //
  }

  trimText(string, limit) {
    return string.length > limit ? `'${string.substring(0, limit)}...'` : string;
  }

}
