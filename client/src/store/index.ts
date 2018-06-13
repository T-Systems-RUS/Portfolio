import Vue from 'vue';
import Vuex from 'vuex';

import projects from './modules/projects/index';
import technologies from './modules/technologies/index';
import fileUpload from '../components/common/FileUploader/fileUploadStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    projects,
    technologies,
    fileUpload
  }
});
