import {HttpClientService} from '../../http/http-client.service';
import {routes} from '../../http/routes';

export class ProjectService extends HttpClientService{

  getProjects() {
    return this.get(routes.GET_PROJECTS);
  };

  getProject(id:string) {
    return this.get(routes.GET_PROJECT + id);
  }

  getProjectAddons() {
    return this.get(routes.GET_PROJECT_ADDONS);
  }

  deleteProject(id:string) {
    return this.delete(routes.DELETE_PROJECT + id);
  }
}
