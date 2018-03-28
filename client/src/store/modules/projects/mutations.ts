import {SET_CUSTOMERS, SET_PROJECTS} from './project-types';
import {IProject, IProjectState} from '../../../shared/interfaces/IProject';

export const mutations = {
  [SET_PROJECTS](state: IProjectState, payload: IProject[]) {
    state.projects = payload;
    state.loading = false;
  },
  [SET_CUSTOMERS](state: IProjectState, payload: String[]) {
    state.customers = payload;
    state.loading = false;
  }
};
