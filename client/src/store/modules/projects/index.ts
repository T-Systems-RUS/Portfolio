import {mutations} from './mutations';
import {actions} from './actions';
import {getters} from './getters';
import {IProject} from '../../../shared/interfaces/IProject';
import {ICustomer} from '../../../shared/interfaces/ICustomer';
import {ILine} from '../../../shared/interfaces/ILine';
import {IProgram} from '../../../shared/interfaces/IProgram';
import {IDomain} from '../../../shared/interfaces/IDomain';
import {IType} from '../../../shared/interfaces/IType';
import {IFilter} from '../../../shared/interfaces/IFilter';
import {Module} from 'vuex';
import {IAccordion} from '../../../shared/interfaces/ui/IAccordion';

export interface IProjectState {
  accordion: IAccordion;
  projects: IProject[];
  lines: ILine[];
  programs: IProgram[];
  domains: IDomain[];
  types: IType[];
  customers: ICustomer[];
  filter: IFilter;
  loading: boolean;
  search: string;
  autocompleteSearch: string;
}

const projectState: Module<IProjectState, {}> = {
  state: {
    accordion: {} as IAccordion,
    projects: [],
    customers: [],
    lines: [],
    programs: [],
    domains: [],
    types: [],
    filter: {} as IFilter,
    loading: true,
    search: '',
    autocompleteSearch: ''
  },
  mutations,
  actions,
  getters
};

export default projectState;
