import {Injectable} from '@angular/core';
import {ExtractService} from '../../core/extract.service';
import {Observable} from 'rxjs/Observable';

import {Employee} from '../../shared/models/employee';
import {Role} from '../../shared/models/role';
import {HttpClient} from '@angular/common/http';
import routes from '../../shared/constants/routes';

@Injectable()
export class EmployeeService {


  constructor(private http: HttpClient, private extract: ExtractService) {
  }

  // GET requests
  getEmployees(): Observable<Employee[]> {
    // ...using get request
    return this.http.get(routes.getEmployees)
    // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));

  }

  getRoles(): Observable<Role[]> {
    // ...using get request
    return this.http.get(routes.getRoles)
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
