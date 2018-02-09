import {Component, Input} from '@angular/core';
import {Project} from '../../../shared/models/project';
import {Comparer} from '../../../shared/helpers/comparer';

@Component({
  selector: 'project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: [
    './project-modal.component.less']
})
export class ProjectModalComponent {

  @Input() project: Project = new Project();
  @Input() compareProject: Project;

  comparer: Comparer;

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
