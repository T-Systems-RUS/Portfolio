import {MutationTree} from 'vuex';
import {ITechnologyState} from './index';
import {ITechnology} from '../../../shared/interfaces/ITechnology';
import {SET_TECHNOLOGIES, SET_TECHNOLOGIES_FILTER} from './mutation-types';

export const mutations: MutationTree<ITechnologyState> = {
  [SET_TECHNOLOGIES](state, payload: ITechnology[]) {
    state.technologies = payload;
    state.loading = false;
  },
  [SET_TECHNOLOGIES_FILTER](state, payload: string) {
    state.filter = payload;
  }
};
