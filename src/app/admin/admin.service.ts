import {Injectable} from '@angular/core';
import {Employee} from '../shared/models/employee';
import {Role} from '../shared/models/role';
import {Technology} from '../shared/models/technology';
import routes from '../shared/constants/routes';
import {HttpClientService} from '../core/http-client.service';

@Injectable()
export class AdminService {

  constructor(private http: HttpClientService) {
  }

  // GET requests
  getEmployees() {
    return this.http.get<Employee[]>(routes.getEmployees);
  }

  getRoles() {
    return this.http.get<Role[]>(routes.getRoles);
  }

  getTechnologies() {
    return this.http.get<Technology[]>(routes.getTechnologies);
  }

  doesTechnologyExist(name: string, id: string) {
    return this.http.get(routes.doesTechnologyExist + name + '/' + id);
  }

  // POST requests
  createTechnology(technology: Technology) {
    return this.http.post(routes.createTechnology, technology);
  }

  updateTechnology(technology: Technology) {
    return this.http.post(routes.updateTechnology, technology);
  }

  deleteTechnology(id) {
    return this.http.delete(routes.deleteTechnology + id);
  }
}
