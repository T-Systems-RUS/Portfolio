import {IEmployee} from '../interfaces/IEmployee';
import {IRole} from '../interfaces/IRole';
import {ISchedule} from '../interfaces/ISchedule';

export class ModelFactory {
  static createSchedule(employee: IEmployee, projectId?: string, role? :IRole): ISchedule {
    return {
      id:'',
      employee,
      employeeId: employee ? employee.id : '',
      role: role || {} as IRole,
      roleId: role ? role.id : '',
      projectId: projectId || '',
      startdate: new Date(),
      enddate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      participation: 100.00
    } as ISchedule
  }
}
