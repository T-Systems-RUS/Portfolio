import {HttpClientService} from '../../http/http-client.service';
import {routes} from '../../http/routes';
import {IProject} from '../../../shared/interfaces/IProject';
import {IFileUpload} from '../../../components/common/FileUploader/IFileUploadList';
import {IModel} from '../../../shared/interfaces/IModel';

export class ProjectService extends HttpClientService{

  doesProjectExist(name: string = '') {
    return this.get(`${routes.DOES_PROJECT_EXIST}${name}`);
  }

  doesProjectWithIdExist(name: string = '', id:string) {
    return this.get(`${routes.DOES_PROJECT_EXIST_WITH_ID}${name}/${id}`);
  }

  getProjects() {
    return this.get(routes.GET_PROJECTS);
  }

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

  removeImage<T>(data: T) {
    return this.put(routes.REMOVE_PROJECT_IMAGA, data);
  }
}
