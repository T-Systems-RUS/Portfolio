import {Module} from 'vuex';
import {actions} from './actions';
import {mutations} from './mutations';
import {ITechnology} from '../../../shared/interfaces/ITechnology';
import {TECHNOLGOGIES_FILTERED, TECHNOLOGIES} from './getter-types';

export interface ITechnologyState {
  technologies: ITechnology[];
  loading: boolean;
  filter: string;
}

const technologiesModule: Module<ITechnologyState, {}> = {
  state: {
    technologies: [],
    loading: true,
    filter: ''
  },
  mutations,
  actions,
  getters: {
    [TECHNOLOGIES]: state => state.technologies,
    [TECHNOLGOGIES_FILTERED]: state => state.technologies.filter(technology =>
      technology.name.toLowerCase().indexOf(state.filter.toLowerCase()) > -1)
  }
};

export default technologiesModule;
