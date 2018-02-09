import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {ExtractService} from '../../core/extract.service';
import {Observable} from 'rxjs/Observable';
import {Routes} from '../../shared/helpers/routes';
import {Project} from '../../shared/models/project';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProjectService {
  routes: Routes;

  constructor(private http: HttpService, private extract: ExtractService) {
    this.routes = new Routes();
  }

  // GET requests
  getProjects(): Observable<Project[]> {
    // ...using get request
    return this.http.get(this.routes.getProjects)
    // ...and calling .json() on the response to return data
      .map(this.extract.extractData)
      // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));

  }

  getProjectsByName(name): Observable<Project[]> {
    // ...using get request
    return this.http.get(this.routes.history + name)
    // ...and calling .json() on the response to return data
      .map(this.extract.extractData)
      // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));

  }

  getProject(id): Observable<Project> {
    // ...using get request
    return this.http.get(this.routes.getProjects + id)
    // ...and calling .json() on the response to return data
      .map(this.extract.extractData)
      // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));

  }

  // POST requests
  createProject(project: Project) {
    const data = this.http.createParams(project);
    return this.http.post(this.routes.createProject, data)
      .map(this.extract.extractData)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));
  }

  updateProject(project: Project) {

    const data = this.http.createParams(project);
    return this.http.post(this.routes.updateProject, data)
      .map(this.extract.extractData)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));

  }

  archieveProject(project: Project) {

    const data = this.http.createParams(project);
    return this.http.put(this.routes.archieve, data)
      .map(this.extract.extractData)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));

  }

  deleteProject(project: Project) {
    return this.http.delete(this.routes.deleteProject + project.name)
      .map(this.extract.extractData)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));

  }

  getConstants(): Observable<{ lines: string[]; domains: string[]; types: string[]; programs: string[] }> {
    return this.http.getConstants()
      .map(this.extract.extractData)
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }
}
