import {Module} from 'vuex';
import {actions} from './actions';
import {getters} from './getters';
import {mutations} from './mutations';
import {ITechnology} from '../../../shared/interfaces/ITechnology';


export interface ITechnologyState {
  technologies: ITechnology[];
  selected: string[];
  loading: boolean;
  filter: string;
}

const technologiesModule: Module<ITechnologyState, {}> = {
  state: {
    technologies: [],
    selected:[],
    loading: true,
    filter: ''
  },
  mutations,
  actions,
  getters
};

export default technologiesModule;
