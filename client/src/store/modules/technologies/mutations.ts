import {MutationTree} from 'vuex';
import {ITechnologyState} from './index';
import {ITechnology} from '../../../shared/interfaces/ITechnology';
import {TOGGLE_TECHNOLOGY, SET_TECHNOLOGIES, SET_TECHNOLOGIES_FILTER} from './mutation-types';
import {Extension} from '../../../shared/classes/Extension';

export const mutations: MutationTree<ITechnologyState> = {
  [TOGGLE_TECHNOLOGY](state, payload: { id: string}) {
    state.selected = Extension.toggleArray(state.selected, payload.id);
    state.loading = false;
  },
  [SET_TECHNOLOGIES](state, payload: ITechnology[]) {
    state.technologies = payload;
    state.loading = false;
  },
  [SET_TECHNOLOGIES_FILTER](state, payload: string) {
    state.filter = payload;
  }
};
