import {Injectable} from '@angular/core';
import {ExtractService} from '../../core/extract.service';
import {Observable} from 'rxjs/Observable';
import {Routes} from '../../shared/helpers/routes';
import {Project} from '../../shared/models/project';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProjectService {
  routes: Routes;

  constructor(private http: HttpClient, private extract: ExtractService) {
    this.routes = new Routes();
  }

  // GET requests
  getProjects(): Observable<Project[]> {
    // ...using get request
    return this.http.get(this.routes.getProjects)
      // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }

  getProjectsByName(name): Observable<Project[]> {
    // ...using get request
    return this.http.get(this.routes.history + name)
      // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }

  getProject(id): Observable<Project> {
    // ...using get request
    return this.http.get(this.routes.getProjects + id)
      // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }

  // POST requests
  createProject(project: Project) {
    return this.http.post(this.routes.createProject, project)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));
  }

  updateProject(project: Project) {
    return this.http.post(this.routes.updateProject, project)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));
  }

  archieveProject(project: Project) {
    return this.http.put(this.routes.archieve, project)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));
  }

  deleteProject(project: Project) {
    return this.http.delete(this.routes.deleteProject + project.name)
      .catch(error => Observable.throw(this.extract.handlePostError(error)));
  }
}
