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
import {ISchedule} from '../../../shared/interfaces/ISchedule';
import {ITechnology} from '../../../shared/interfaces/ITechnology';
import {TestMocks} from '../../../shared/classes/TestMocks';

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
  search: string;
  autocompleteSearch: string;
  sort: string;
  sortReverse: boolean;
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
    filter: {} as IFilter,
    loading: true,
    search: '',
    autocompleteSearch: '',
    sort: 'name',
    sortReverse: true
  },
  mutations,
  actions,
  getters
};

export default projectState;
