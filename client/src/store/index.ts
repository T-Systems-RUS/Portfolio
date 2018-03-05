import Vue from 'vue'
import Vuex from 'vuex'

import {DELETE_ITEM, EDIT_ITEM, SET_ITEMS} from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    loading: true
  },
  mutations: {
    [SET_ITEMS](state, payload) {
      state.items = payload;
      state.loading = false;
    },
    [DELETE_ITEM](state, index: number) {
      state.items.splice(index, 1)
    },
    [EDIT_ITEM](state, payload) {
      Vue.set(state.items, payload.index, payload.item)
    },
  },
})
