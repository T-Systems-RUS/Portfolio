import Vue from 'vue'
import Vuex from 'vuex'
import {IProjectState,IProject} from './../shared/interfaces/project';
import {DELETE_PROJECT, EDIT_PROJECT, NEW_PROJECT, SET_PROJECTS} from './mutation-types'

Vue.use(Vuex);



export default new Vuex.Store<IProjectState>({
  state: {
    projects: [],
    loading: true
  },
  mutations: {
    [SET_PROJECTS](state, payload) {
      state.projects = payload;
      state.loading = false;
    },
    [NEW_PROJECT](state, payload: IProject) {
      state.projects.push(payload)
    },
    [DELETE_PROJECT](state, index: number) {
      state.projects.splice(index, 1)
    },
    [EDIT_PROJECT](state, payload) {
      Vue.set(state.projects, payload.index, payload.item)
    },
  },
})
