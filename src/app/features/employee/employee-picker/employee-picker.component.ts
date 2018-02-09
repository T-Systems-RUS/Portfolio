import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Employee} from '../../../shared/models/employee';
import {Role} from '../../../shared/models/role';
import {Schedule} from '../../../shared/models/schedule';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'employee-picker',
  templateUrl: './employee-picker.component.html',
  styleUrls: ['./employee-picker.component.less'],
})
export class EmployeePickerComponent {

  @Input() employees: Employee[] = [];
  @Input() roles: Role[] = [];
  @Input() selectedSchedules: Schedule[] = [];

  @Output() onSelect = new EventEmitter<Schedule[]>();

  initialSchedules: Schedule[] = [];
  schedules: Schedule[] = [];

  constructor(private dataService: EmployeeService) {
  }

  ngOnInit() {
    if (this.employees.length <= 0) {
      this.dataService.getRolesAndEmploees().subscribe(data => {
        this.employees = data[0];
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
        this.initialSchedules = this.schedules;

        // this.schedules.filter((item)=>
        //     this.selectedSchedules.map(i=>i.employee.id)
        //                             .includes(item.employee.id)).forEach(element => {
        //                                 element.active=true;

        //                             });

      }, error => {
        console.log(error);
      });
    }
  }

  filterEmployees(event) {
    this.schedules = this.initialSchedules;
    this.schedules = this.schedules.filter(item =>
      (item.employee.firstname + ' ' + item.employee.lastname).toLowerCase().indexOf(event.toLowerCase()) !== -1
    );
  }

  selectEmployee(event) {
    const selected = this.schedules.filter(item => item.active);
    this.onSelect.emit(selected);
  }

  stopAction($event) {
    $event.stopPropagation();
  }

}
