import {HttpClientService} from '../../http/http-client.service';
import {routes} from '../../http/routes';

export class EmployeeService extends HttpClientService{

  getEmployees() {
    return this.get(routes.GET_EMPLOYEES);
  }

  getRoles() {
    return this.get(routes.GET_ROLES);
  }
}
