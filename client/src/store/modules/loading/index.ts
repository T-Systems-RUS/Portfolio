import {Module} from 'vuex';
import {GET_LOADING_STATE} from './getter-types';
import {DECREMENT_LOADING_STATE, INCREMENT_LOADING_STATE} from './mutation-types';

interface ILoadingState {
  loading: string[];
}

const loadingState: Module<ILoadingState, {}> = {
  state: {
    loading: []
  },
  mutations: {
    [INCREMENT_LOADING_STATE](state, loading: string) {
      state.loading.push(loading);
    },
    [DECREMENT_LOADING_STATE](state) {
      state.loading.pop();
    }
  },
  getters: {
    [GET_LOADING_STATE]: state => state.loading.length
  }
};

export default loadingState;
