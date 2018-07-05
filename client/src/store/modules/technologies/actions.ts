import {ActionTree} from 'vuex';
import {FETCH_TECHNOLOGIES} from './action-types';
import {TechnologyService} from './technology-service';
import {ITechnologyState} from './index';
import {SET_TECHNOLOGIES} from './mutation-types';

export const actions: ActionTree<ITechnologyState, {}> = {
  [FETCH_TECHNOLOGIES]({commit}) {
    return TechnologyService.getTechnologies()
      .then((response) => {
        commit(SET_TECHNOLOGIES, response.data);
      });
  }
}
