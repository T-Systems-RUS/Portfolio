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
    return state.projects;
  }
}
