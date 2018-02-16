import {Component, Input, Output, EventEmitter, AfterContentInit} from '@angular/core';
import {Role} from '../../../shared/models/role';
import {Schedule} from '../../../shared/models/schedule';

/**
 * Component for employee item
 * and roles dropdown
 * @export
 * @class ListItemComponent
 * @implements {AfterContentInit}
 */
@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements AfterContentInit {

  @Input() model: Schedule = new Schedule();
  @Input() roles: Role[] = [];

  @Input() itemStyle = '';
  @Input() headingStyle = '';

  @Input() clickable = false;
  @Output() clicked = new EventEmitter<Schedule>();

  active = false;

  ngAfterContentInit() {
    // set role of schedule if schedule has one, otherwise first role from roles list
    this.model.role = this.model.role.id === '' ? this.roles[0] : this.model.role;
  }

  performCLick(value: Schedule) {

    if (this.clickable) {
      value.active = !value.active;
      value.participation = value.active ? 100.00 : 0.0;
      this.clicked.emit(this.model);
    }
  }

  stopAction($event) {
    $event.stopPropagation();
  }

  selectRole($event) {
    this.model.role = this.roles.filter(item => item.id.toString() === $event.target.value)[0];
    this.model.active = true;
    this.model.participation = 100.00;
    this.clicked.emit(this.model);
  }
}
