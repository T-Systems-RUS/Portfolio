import {SET_TECHNOLOGIES} from './technology-types';
import {ITechnologyState} from './index';
import {ITechnology} from '../../../shared/interfaces/ITechnology';

export const mutations = {
  [SET_TECHNOLOGIES](state: ITechnologyState, payload: ITechnology[]) {
    state.technologies = payload;
    state.loading = false;
  }
}
