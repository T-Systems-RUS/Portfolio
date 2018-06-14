import {GetterTree} from 'vuex';
import {IEmployeeState} from './index';
import {EMPLOYEES} from './getter-types';
import {ROLES} from './getter-types';



export const getters: GetterTree<IEmployeeState, {}> = {
  [EMPLOYEES]: state =>  state.employees,
  [ROLES]: state => state.roles
};
