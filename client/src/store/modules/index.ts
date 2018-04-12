import Vue from 'vue'
import Vuex from 'vuex'

import projects from './projects/index';
import technologies from './technologies/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    projects,
    technologies
  }
})
