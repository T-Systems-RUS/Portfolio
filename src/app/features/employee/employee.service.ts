import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {ExtractService} from '../../core/extract.service';
import {Observable} from 'rxjs/Observable';

import {Employee} from '../../shared/models/employee';
import {Role} from '../../shared/models/role';
import {Routes} from '../../shared/helpers/routes';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class EmployeeService {

  routes: Routes;

  constructor(private http: HttpService, private extract: ExtractService) {
    this.routes = new Routes();
  }

  // GET requests
  getEmployees(): Observable<Employee[]> {
    // ...using get request
    return this.http.get(this.routes.getEmployees)
    // ...and calling .json() on the response to return data
      .map(this.extract.extractData)
      // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));

  }

  getRoles(): Observable<Role[]> {
    // ...using get request
    return this.http.get(this.routes.getRoles)
    // ...and calling .json() on the response to return data
      .map(this.extract.extractData)
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
