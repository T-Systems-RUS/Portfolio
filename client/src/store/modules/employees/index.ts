import {Module} from 'vuex';
import {actions} from './actions';
import {getters} from './getters';
import {mutations} from './mutations';
import {IEmployee} from '../../../shared/interfaces/IEmployee';
import {IRole} from '../../../shared/interfaces/IRole';


export interface IEmployeeState {
  employees: IEmployee[];
  roles: IRole[],
  selected: string[];
  loading: boolean;
  filter: string;
}

const employeeModule: Module<IEmployeeState, {}> = {
  state: {
    employees: [],
    roles: [],
    selected:[],
    loading: true,
    filter: ''
  },
  mutations,
  actions,
  getters
};

export default employeeModule;
