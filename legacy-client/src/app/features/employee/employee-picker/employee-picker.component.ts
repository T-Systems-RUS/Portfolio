import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Employee} from '../../../shared/models/employee';
import {Role} from '../../../shared/models/role';
import {Schedule} from '../../../shared/models/schedule';
import {EmployeeService} from '../employee.service';

/**
 * Used in create/update ProjectChange form
 * Select Employees Roles and participation
 * @export
 * @class EmployeePickerComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'employee-picker',
  templateUrl: './employee-picker.component.html',
  styleUrls: ['./employee-picker.component.scss'],
})
export class EmployeePickerComponent implements OnInit {
  @Input() employees: Employee[] = [];
  @Input() roles: Role[] = [];
  // if project has schedules in db make them active
  @Input() selectedSchedules: Schedule[] = [];
  @Output() onSelect = new EventEmitter<Schedule[]>();

  // prop for filtering, keeps initial state of schedules
  initialSchedules: Schedule[] = [];
  // stores list of all schedules converted from all employees and roles
  schedules: Schedule[] = [];

  constructor(private dataService: EmployeeService) {
  }

  ngOnInit() {
    if (this.employees.length <= 0) {
      this.dataService.getRolesAndEmploees().subscribe(data => {
        this.employees = data[0];
        // Converts employees to schedules
        // in parallel checking if project has shedules from list
        // makes them active(selected)
        this.schedules = this.employees.map(item => {
          const schedule = this.selectedSchedules.filter(i => i.employee.id === item.id)[0];
          return new Schedule({
            employee: item,
            role: schedule ? schedule.role : new Role(),
            participation: schedule ? schedule.participation : 0.0,
            active: schedule ? true : false
          });
        });
        this.roles = data[1];
        // stores initial state of all schedules
        this.initialSchedules = this.schedules;
      }, error => {
        console.log(error);
      });
    }
  }
/**
 * Resets schedules to initial state
 * Filters through initial list by employee first and lastname
 * Not case sensitive
 * @param {any} event value typed in search field
 * @memberof EmployeePickerComponent
 */
  filterEmployees(event) {
    this.schedules = this.initialSchedules;
    this.schedules = this.schedules.filter(item =>
      (`'${item.employee.firstname} ${item.employee.lastname}'`).toLowerCase().indexOf(event.toLowerCase()) !== -1
    );
  }
/**
 * Check shedules with active property
 * Emits up to create/update project form
 * Prop active is changed inside List item component
 * @memberof EmployeePickerComponent
 */
selectEmployee() {
    const selected = this.initialSchedules.filter(item => item.active);
    this.onSelect.emit(selected);
  }
}
