import {ActionTree} from 'vuex';
import {FETCH_EMPLOYEES} from './action-types';
import {EmployeeService} from './EmployeeService';
import {IEmployeeState} from './index';
import {SET_EMPLOYEES} from './mutation-types';
import {SET_ROLES} from './mutation-types';
import {FETCH_ROLES} from './action-types';

const service = new EmployeeService();

export const actions: ActionTree<IEmployeeState, {}> = {
  [FETCH_EMPLOYEES]({commit}) {
    return service.getEmployees()
      .then((response) => {
        commit(SET_EMPLOYEES, response.data);
      });
  },

  [FETCH_ROLES]({commit}) {
    return service.getRoles()
      .then(response => {
        commit(SET_ROLES, response.data);
      });
  },
}
