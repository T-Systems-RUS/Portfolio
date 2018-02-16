import {Injectable} from '@angular/core';
import {ExtractService} from '../../core/extract.service';
import {Observable} from 'rxjs/Observable';
import {Project} from '../../shared/models/project';
import {HttpClient} from '@angular/common/http';
import routes from '../../shared/constants/routes';

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient, private extract: ExtractService) {
  }

  // GET requests
  getProjects(): Observable<Project[]> {
    // ...using get request
    return this.http.get(routes.getProjects)
    // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }

  getProjectsByName(name): Observable<Project[]> {
    // ...using get request
    return this.http.get(routes.history + name)
    // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }

  getProject(id): Observable<Project> {
    // ...using get request
    return this.http.get(routes.getProjects + id)
    // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }

  // POST requests
  createProject(project: Project) {
    return this.http.post(routes.createProject, project)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));
  }

  updateProject(project: Project) {
    return this.http.post(routes.updateProject, project)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));
  }

  archieveProject(project: Project) {
    return this.http.put(routes.archieve, project)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));
  }

  deleteProject(project: Project) {
    return this.http.delete(routes.deleteProject + project.name)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));
  }
}
