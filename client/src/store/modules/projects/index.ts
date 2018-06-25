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
import {TestMocks} from '../../../shared/classes/TestMocks';
import {IRole} from '../../../shared/interfaces/IRole';
import {CompleteTypes} from '../../../shared/types/complete-types';

export interface IProjectState {
  accordion: IAccordion;
  projects: IProject[];
  project: IProject,
  lines: ILine[];
  programs: IProgram[];
  domains: IDomain[];
  types: IType[];
  customers: ICustomer[];
  filter: IFilter;
  loading: boolean;
  completion: string,
  roles: IRole[],
  search: string;
  autocompleteSearch: string;
  sort: string;
  sortReverse: boolean;
  projectExists: boolean;
}


const initialProject: IProject = TestMocks.TestProject();

const projectState: Module<IProjectState, {}> = {
  state: {
    accordion: {} as IAccordion,
    projects: [],
    project: initialProject,
    customers: [],
    lines: [],
    programs: [],
    domains: [],
    types: [],
    roles: [],
    filter: {} as IFilter,
    loading: true,
    completion: CompleteTypes.ALL,
    search: '',
    autocompleteSearch: '',
    sort: 'name',
    sortReverse: true,
    projectExists: false
  },
  mutations,
  actions,
  getters
};

export default projectState;
