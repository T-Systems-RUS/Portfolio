import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Employee} from '../../shared/models/employee';
import {Role} from '../../shared/models/role';
import routes from '../../shared/constants/routes';
import {HttpClientService} from '../../core/http-client.service';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClientService) {
  }

  // GET requests
  getEmployees() {
    return this.http.get<Employee[]>(routes.getEmployees);
  }

  getRoles() {
    return this.http.get<Role[]>(routes.getRoles);
  }

  getRolesAndEmploees(): Observable<[Employee[], Role[]]> {
    return Observable.forkJoin(
      this.getEmployees(),
      this.getRoles()
    );
  }

}
