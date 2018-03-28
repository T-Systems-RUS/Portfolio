import {FETCH_PROJECTS,SET_CUSTOMERS ,SET_PROJECTS} from './project-types';
import {ProjectService} from './project.service';
import {Extension} from '../../../shared/classes/Extension';

const service = new ProjectService();

export const actions = {

  [FETCH_PROJECTS]({commit}: any) {
    return service.getProjects()
      .then((response) => {
        commit(SET_PROJECTS, response.data);
        commit(SET_CUSTOMERS, Extension.getUniqueValues(response.data, 'customer'));
      })

  }
};
