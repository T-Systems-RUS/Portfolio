import {mutations} from './mutations';
import {actions} from './actions';
import {IProjectState} from '../../../shared/interfaces/IProject';


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
