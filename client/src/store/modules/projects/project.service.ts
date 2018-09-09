import {routes} from '../../http/routes';
import {IProject} from '../../../shared/interfaces/IProject';
import axios from 'axios';


export class ProjectService {

  static doesProjectExist(name: string = '') {
    return axios.get<Boolean>(`${routes.DOES_PROJECT_EXIST}${name}`);
  }

  static doesProjectWithIdExist(name: string = '', uniqueId:string) {
    return axios.get<Boolean>(`${routes.DOES_PROJECT_EXIST_WITH_ID}${name}/${uniqueId}`);
  }

  static getProjects() {
    return axios.get<IProject[]>(routes.GET_PROJECTS);
  }

  static getProject(id:string) {
    return axios.get<IProject>(routes.GET_PROJECT + id);
  }

  static getProjectAddons() {
    return axios.get(routes.GET_PROJECT_ADDONS);
  }

  static createProject(data:IProject) {
    return axios.post<IProject>(routes.CREATE_PROJECT, data);
  }

  static editProject(data:IProject) {
    return axios.post<IProject>(routes.EDIT_PROJECT, data);
  }

  static deleteProject(id:string) {
    return axios.delete(routes.DELETE_PROJECT + id);
  }

  static removeImage<T>(data: T) {
    return axios.put(routes.REMOVE_PROJECT_IMAGE, data);
  }

  static updateImage<T>(data: T) {
    return axios.put(routes.UPDATE_PROJECT_IMAGE, data);
  }

}
