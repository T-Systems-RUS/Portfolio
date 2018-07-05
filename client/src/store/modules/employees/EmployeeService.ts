import axios from 'axios';
import {routes} from '../../http/routes';
import {IEmployee} from '../../../shared/interfaces/IEmployee';
import {IRole} from '../../../shared/interfaces/IRole';

export class EmployeeService {

  static getEmployees() {
    return axios.get<IEmployee[]>(routes.GET_EMPLOYEES);
  }

  static getRoles() {
    return axios.get<IRole[]>(routes.GET_ROLES);
  }
}
