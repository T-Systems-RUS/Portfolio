import {Component, Input} from '@angular/core';
import {ModalComponent} from '../../../../shared/modal/modal.component';
import {Project} from '../../../../shared/models/project';

/**
 * Show preview modal
 * Used on create/update project
 * @export
 * @class ProjectConfirmationComponent
 * @extends {ModalComponent}
 */
@Component({
  selector: 'project-confirmation',
  templateUrl: './project-confirmation.component.html',
  styleUrls: ['./project-confirmation.component.scss']
})
export class ProjectConfirmationComponent extends ModalComponent {

  @Input() project: Project = new Project();

  constructor() {
    super();
  }

}
