import {MutationTree} from 'vuex';
import {IEmployeeState} from './index';
import {SET_EMPLOYEES} from './mutation-types';
import {IEmployee} from '../../../shared/interfaces/IEmployee';
import {SET_ROLES} from './mutation-types';
import {IRole} from '../../../shared/interfaces/IRole';

export const mutations: MutationTree<IEmployeeState> = {
  [SET_EMPLOYEES](state, payload: IEmployee[]) {
    state.employees = payload;
    state.loading = false;
  },
  [SET_ROLES](state, payload: IRole[]) {
    state.roles = payload;
    state.loading = false;
  },
};
