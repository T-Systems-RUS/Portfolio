import {GET_ADDONS} from './project-types';
import {IProjectState} from './index';
import {Types} from './constant-types';

export const getters = {

  [GET_ADDONS](state: IProjectState) {
    return {
      [Types.PRODUCTION_LINE]: state.lines,
      [Types.PROGRAM]: state.programs,
      [Types.DOMAIN]: state.domains,
      [Types.PROJECT_TYPE]: state.types,
      [Types.CUSTOMER]: state.customers,
    };
  }
}
