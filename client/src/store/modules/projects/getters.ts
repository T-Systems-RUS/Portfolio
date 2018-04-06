import {GET_ADDONS} from './project-types';
import {IProjectState} from './index';
import {Types} from './constant-types';


export const getters = {

  [GET_ADDONS](state: IProjectState) {
    return {
      [Types.PRODUCTION_LINE]: state.lines,
      programs: state.programs,
      domains: state.domains,
      types: state.types,
      customers: state.customers
    }
  }
}
