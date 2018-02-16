import {Injectable} from '@angular/core';
import {ExtractService} from '../../core/extract.service';
import {Observable} from 'rxjs/Observable';

import {Employee} from '../../shared/models/employee';
import {Role} from '../../shared/models/role';
import {Routes} from '../../shared/helpers/routes';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EmployeeService {

  routes: Routes;

  constructor(private http: HttpClient, private extract: ExtractService) {
    this.routes = new Routes();
  }

  // GET requests
  getEmployees(): Observable<Employee[]> {
    // ...using get request
    return this.http.get(this.routes.getEmployees)
      // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));

  }

  getRoles(): Observable<Role[]> {
    // ...using get request
    return this.http.get(this.routes.getRoles)
      // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }

  getRolesAndEmploees(): Observable<[Employee[], Role[]]> {
    return Observable.forkJoin(
      this.getEmployees(),
      this.getRoles()
    );
  }

}
