import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../shared/models/project';
import {Comparer} from '../../../shared/helpers/comparer';

/**
 * Modal window with project details
 * Used in project history and create/update project show preview
 * @export
 * @class ProjectModalComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: [
    './project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {

  @Input() project: Project = new Project();
  // project to be compared with
  @Input() compareProject: Project;

  // helpers object from shared module
  comparer: Comparer;

  // Stores properties with differences
  // add classes to elements with difference
  validator = {};
  id: string;

  constructor() {
    this.comparer = new Comparer();
  }

  ngOnInit() {
    if (this.compareProject) {
      this.compareProjects(this.project, this.compareProject);
    }

    this.id = this.project.id;
  }
/**
 * Compares two projects property by property
 * add css classes to controls with diff
 * @param {any} project1 main project
 * @param {any} project2 project to be compared with
 * @memberof ProjectModalComponent
 */
compareProjects(project1, project2) {
    const difference = this.comparer.deepCompare(project1, project2);

    for (const key in difference) {

      if (Array.isArray(difference[key])) {
        difference[key].forEach(id => this.validator[key + id] = 'item--edited');
      } else {
        this.validator[key] = 'project-modal--edited';
      }
    }
  }

}
