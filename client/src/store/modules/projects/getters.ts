import {GET_ADDONS, GET_PROJECTS} from './project-types';
import {IProjectState} from './index';
import {Types} from './constant-types';

export const getters = {

  /**
   * Get properties only for
   * project filter
   * @param {IProjectState} state
   * @returns {{}}
   */
  [GET_ADDONS](state: IProjectState) {
    return {
      [Types.PRODUCTION_LINE]: state.lines,
      [Types.PROGRAM]: state.programs,
      [Types.DOMAIN]: state.domains,
      [Types.PROJECT_TYPE]: state.types,
      [Types.CUSTOMER]: state.customers,
    };
  },

  [GET_PROJECTS](state: IProjectState) {
    let projects = state.projects;

    for (const  key in state.filter) {
      projects = projects.filter(project => {
        if(state.filter[key].length){
          if(Array.isArray(project[key])) {

          } else {
            return state.filter[key].indexOf(project[key].id) > -1;
          }
        } else {
          return project;
        }
      })
    }

    return projects;
  }
}
