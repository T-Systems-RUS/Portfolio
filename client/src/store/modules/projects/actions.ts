import {ActionTree} from 'vuex';
import {ProjectService} from './project.service';
import {IProjectState} from './index';


import {FETCH_ADDONS, FETCH_PROJECT, FETCH_PROJECTS, FETCH_ROLES, GENERATE_PRESENTATION} from './action-types';

import {
  FINISH_LOADING, SET_CUSTOMERS, SET_DOMAINS, SET_LINES, SET_PROGRAMS, SET_PROJECT, SET_PROJECTS, SET_ROLES,
  SET_TYPES
} from './mutation-types';
import {PowerPointService} from './PowerPointService';
import {PROJECTS} from './getter-types';

const service = new ProjectService();

export const actions: ActionTree<IProjectState, {}> = {

  [FETCH_PROJECTS]({commit}) {
    return service.getProjects()
      .then(response => {
        commit(SET_PROJECTS, response.data);
      });
  },

  [FETCH_PROJECT]({commit}, id:string) {
    return service.getProject(id)
      .then(response => {
        commit(SET_PROJECT, response.data);
      });
  },

  [FETCH_ROLES]({commit}) {
    return service.getRoles()
      .then(response => {
        commit(SET_ROLES, response.data);
      });
  },

  [FETCH_ADDONS]({commit}) {
    return service.getProjectAddons()
      .then(response => {
        commit(SET_LINES, response.data.lines);
        commit(SET_PROGRAMS, response.data.programs);
        commit(SET_DOMAINS, response.data.domains);
        commit(SET_TYPES, response.data.types);
        commit(SET_CUSTOMERS, response.data.customers);
        commit(FINISH_LOADING);
      });
  },

  [GENERATE_PRESENTATION]({getters}) {
    return PowerPointService.createProjectsPresentation(getters[PROJECTS]);
  }
};
