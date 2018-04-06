import {HttpClientService} from '../../http/http-client.service';
import {routes} from '../../http/routes';

export class ProjectService extends HttpClientService{

  getProjects() {
    return this.get(routes.GET_PROJECTS);
  };

  getProjectAddons() {
    return this.get(routes.GET_PROJECT_ADDONS);
  }
}
