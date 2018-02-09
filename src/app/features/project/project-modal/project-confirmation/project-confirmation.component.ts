import {Component, Input} from '@angular/core';
import {ModalComponent} from '../../../../shared/modal/modal.component';
import {Project} from '../../../../shared/models/project';

@Component({
  selector: 'project-confirmation',
  templateUrl: './project-confirmation.component.html',
  styleUrls: ['./project-confirmation.component.less']
})
export class ProjectConfirmationComponent extends ModalComponent {

  @Input() project: Project = new Project();

  constructor() {
    super();
  }

}
