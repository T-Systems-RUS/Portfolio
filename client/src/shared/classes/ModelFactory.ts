import {IEmployee} from '../interfaces/IEmployee';
import {IRole} from '../interfaces/IRole';
import {ISchedule} from '../interfaces/ISchedule';
import {IProject} from '../interfaces/IProject';
import {ITechnology} from '../interfaces/ITechnology';
import {IType} from '../interfaces/IType';
import {IProgram} from '../interfaces/IProgram';
import {IDomain} from '../interfaces/IDomain';
import {ICustomer} from '../interfaces/ICustomer';
import Guid from './Guid';

export class ModelFactory {
  static createSchedule(employee: IEmployee, projectId?: string, role? :IRole): ISchedule {
    return {
      id:'',
      active: false,
      employee,
      employeeId: employee ? employee.id : '',
      role: role || {} as IRole,
      roleId: role ? role.id : '',
      projectId: projectId || '',
      startdate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      participation: 100.00
    } as ISchedule
  }

  static createProject() : IProject {
    return {
      id:'',
      active: false,
      name: '',
      description: '',
      completed: false,
      domain: {} as IDomain,
      program: {} as IProgram,
      type: {} as IType,
      image: '',
      schedules: [] as ISchedule[],
      customers: [] as ICustomer[],
      technologies: [] as ITechnology[],
      createdAt: new Date(),
      updatedAt: new Date(),
      uniqueId: Guid.newGuid(),
      pss: 0,
      startdate: '',
      enddate: ''
    } as IProject
  }
}
