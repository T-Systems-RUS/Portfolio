import {mutations} from './mutations';
import {actions} from './actions';
import {IProject} from '../../../shared/interfaces/IProject';

export interface IProjectState {
  projects: IProject[],
  customers: String[],
  loading: boolean;
}

const initialState: IProjectState = {
  projects: [],
  customers: [],
  loading: true
};

export default {
  state: {...initialState},
  mutations,
  actions
}
