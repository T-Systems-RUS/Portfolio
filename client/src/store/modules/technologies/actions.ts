import {FETCH_TECHNOLOGIES, SET_TECHNOLOGIES} from './technology-types';
import {TechnologyService} from './technology-service';
import {ActionTree} from 'vuex';
import {ITechnologyState} from './index';

const service = new TechnologyService();

export const actions: ActionTree<ITechnologyState, {}> = {
  [FETCH_TECHNOLOGIES]({commit}) {
    return service.getTechnologies()
      .then((response) => {
        commit(SET_TECHNOLOGIES, response.data);
      })
  }
}
