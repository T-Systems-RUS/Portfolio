import {Injectable} from '@angular/core';
import {Project} from '../../shared/models/project';
import routes from '../../shared/constants/routes';
import {HttpClientService} from '../../core/http-client.service';

@Injectable()
export class ProjectService {

  constructor(private http: HttpClientService) {
  }

  // GET requests
  getProjects() {
    return this.http.get<Project[]>(routes.getProjects);
  }

  getProjectsByName(name) {
    return this.http.get<Project[]>(routes.history + name);
  }

  getProject(id) {
    return this.http.get<Project>(routes.getProjects + id);
  }

  // POST requests
  createProject(project: Project) {
    return this.http.post(routes.createProject, project);
  }

  updateProject(project: Project) {
    return this.http.post<Project>(routes.updateProject, project);
  }

  archieveProject(project: Project) {
    return this.http.put(routes.archieve, project);
  }

  deleteProject(project: Project) {
    return this.http.delete(routes.deleteProject + project.name);
  }
}
