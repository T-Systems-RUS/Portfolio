import {HttpClientService} from '../../http/http-client.service';
import {routes} from '../../http/routes';
import {IProject} from '../../../shared/interfaces/IProject';

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

  createProject(data:IProject) {
    return this.post(routes.CREATE_PROJECT, data);
  }

  editProject(data:IProject) {
    return this.post(routes.EDIT_PROJECT, data);
  }

  deleteProject(id:string) {
    return this.delete(routes.DELETE_PROJECT + id);
  }
}
