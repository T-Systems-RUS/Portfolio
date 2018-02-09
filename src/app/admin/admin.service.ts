import {Injectable} from '@angular/core';
import {HttpService} from '../core/http.service';
import {ExtractService} from '../core/extract.service';
import {Observable} from 'rxjs/Observable';
import {Routes} from '../shared/helpers/routes';

import {Employee} from '../shared/models/employee';
import {Role} from '../shared/models/role';
import {Technology} from '../shared/models/technology';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AdminService {

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

  getTechnologies(): Observable<Technology[]> {
    // ...using get request
    return this.http.get(this.routes.getTechnologies)
    // ...and calling .json() on the response to return data
      .map(this.extract.extractData)
      // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }

  doesTechnologyExist(name: string, id: string) {
    return this.http.get(this.routes.doesTechnologyExist + name + '/' + id)
    // ...and calling .json() on the response to return data
      .map(res => res.json())
      // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }

  // POST requests
  createTechnology(technology: Technology) {
    const data = this.http.createParams(technology);
    return this.http.post(this.routes.createTechnology, data)
      .map(this.extract.extractData)
      .catch((error: {}) => Observable.throw(this.extract.handlePostError(error)));
  }

  updateTechnology(technology: Technology) {
    const data = this.http.createParams(technology);
    return this.http.post(this.routes.updateTechnology, data)
      .map(this.extract.extractData)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));
  }

  deleteTechnology(id) {
    return this.http.delete(this.routes.deleteTechnology + id)
      .map(this.extract.extractData)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));

  }

  getConstants(): Observable<{ roles: string[]; seniority: string[]; technologies: string[] }> {
    return this.http.getConstants()
      .map(this.extract.extractData)
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }
}
