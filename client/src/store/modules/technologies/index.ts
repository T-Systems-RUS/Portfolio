import {actions} from './actions';
import {mutations} from './mutations';
import {ITechnology} from '../../../shared/interfaces/ITechnology';

export interface ITechnologyState {
  technologies: ITechnology[];
  loading: boolean;
}

const initialState: ITechnologyState = {
  technologies: [],
  loading: true
};

export default {
  state: {...initialState},
  mutations,
  actions
}
