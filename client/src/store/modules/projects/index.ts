import {mutations} from './mutations';
import {actions} from './actions';
import {getters} from './getters';
import {IProject} from '../../../shared/interfaces/IProject';
import {ICustomer} from '../../../shared/interfaces/ICustomer';
import {ILine} from '../../../shared/interfaces/ILine';
import {IProgram} from '../../../shared/interfaces/IProgram';
import {IDomain} from '../../../shared/interfaces/IDomain';
import {IType} from '../../../shared/interfaces/IType';

export interface IProjectState {
  projects: IProject[];
  lines: ILine[];
  programs: IProgram[];
  domains: IDomain[];
  types: IType[];
  customers: ICustomer[];
  filter: Object;
  loading: boolean;
}

const initialState: IProjectState = {
  projects: [],
  customers: [],
  lines: [],
  programs: [],
  domains: [],
  types: [],
  filter: {},
  loading: true
};

export default {
  state: {...initialState},
  mutations,
  actions,
  getters
}
