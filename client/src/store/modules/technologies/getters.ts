import {GetterTree} from 'vuex';
import {ITechnologyState} from './index';
import {TECHNOLGOGIES_FILTERED, TECHNOLOGIES} from './getter-types';



export const getters: GetterTree<ITechnologyState, {}> = {
  [TECHNOLOGIES]: state =>  state.technologies,
  [TECHNOLGOGIES_FILTERED](state: ITechnologyState) {
    return state.technologies.filter(technology => {
      technology.active = state.selected.indexOf(technology.id) > -1;
      return technology.name.toLowerCase().indexOf(state.filter.toLowerCase()) > -1
    })
  }
};
