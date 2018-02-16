import {Injectable} from '@angular/core';
import {ExtractService} from '../core/extract.service';
import {Observable} from 'rxjs/Observable';

import {Employee} from '../shared/models/employee';
import {Role} from '../shared/models/role';
import {Technology} from '../shared/models/technology';
import {HttpClient} from '@angular/common/http';
import routes from '../shared/constants/routes';

@Injectable()
export class AdminService {

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

  getTechnologies(): Observable<Technology[]> {
    // ...using get request
    return this.http.get(routes.getTechnologies)
    // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }

  doesTechnologyExist(name: string, id: string) {
    return this.http.get(routes.doesTechnologyExist + name + '/' + id)
    // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }

  // POST requests
  createTechnology(technology: Technology) {
    return this.http.post(routes.createTechnology, technology)
      .catch((error: {}) => Observable.throw(this.extract.handlePostError(error)));
  }

  updateTechnology(technology: Technology) {
    return this.http.post(routes.updateTechnology, technology)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));
  }

  deleteTechnology(id) {
    return this.http.delete(routes.deleteTechnology + id)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));
  }
}
