import {FETCH_PROJECTS, FETCH_ADDONS,SET_CUSTOMERS, FINISH_LOADING,SET_PROJECTS, SET_LINES, SET_PROGRAMS, SET_DOMAINS, SET_TYPES} from './project-types';
import {ProjectService} from './project.service';
import {ActionTree} from 'vuex';
import {IProjectState} from './index';

const service = new ProjectService();

export const actions:ActionTree<IProjectState,{}> = {

  [FETCH_PROJECTS]({commit}) {
    return service.getProjects()
      .then((response) => {
        commit(SET_PROJECTS, response.data);
      })
  },

  [FETCH_ADDONS]({commit}) {
    return service.getProjectAddons()
      .then((response) => {
        commit(SET_LINES, response.data.lines);
        commit(SET_PROGRAMS, response.data.programs);
        commit(SET_DOMAINS, response.data.domains);
        commit(SET_TYPES, response.data.types);
        commit(SET_CUSTOMERS, response.data.customers);
        commit(FINISH_LOADING);
      })
  }
};
