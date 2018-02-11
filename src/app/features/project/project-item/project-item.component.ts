import {Component, Input, AfterViewInit} from '@angular/core';
import {Project} from '../../../shared/models/project';

/**
 * Card with project
 * on project list page
 * @export
 * @class ProjectItemComponent
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements AfterViewInit {

  @Input() model: Project = new Project();
  // stores trimmed project description
  description = '';
  // shows closed ribbon if project is closed(enddate)
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
/**
 * Trims description of project if it is too long
 * TODO make a directive
 * @param {any} string to be trimmed
 * @param {any} limit limit before trim
 * @returns new trimmed string or initial if it is shorter than limit
 * @memberof ProjectItemComponent
 */
trimText(string, limit) {
    return string.length > limit ? `${string.substring(0, limit)}...` : string;
  }

}
