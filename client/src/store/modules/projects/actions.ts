import {ActionTree} from 'vuex';
import {ProjectService} from './project.service';
import {IProjectState} from './index';
import {Routes} from './../../../router/index';
import router from './../../../router/index';


import {
  DELETE_PROJECT,
  FETCH_ADDONS,
  FETCH_PROJECT,
  FETCH_PROJECT_WITH_IMAGE,
  FETCH_PROJECTS,
  GENERATE_PRESENTATION, GENERATE_PRESENTATION_SINGLE, SYNC_PARAMS
} from './action-types';

import {
  FINISH_LOADING, SET_CUSTOMERS, SET_DOMAINS, SET_FILTER_VALUE, SET_LINES, SET_PROGRAMS, SET_PROJECT, SET_PROJECTS,
  SET_TYPES
} from './mutation-types';
import {PowerPointService} from './PowerPointService';
import {PROJECT, PROJECTS} from './getter-types';
import {SET_IMAGE_URL} from '../../../components/common/FileUploader/fileUploadStore/mutation-types';
import {FileUploadStatus} from '../../../components/common/FileUploader/IFileUploadList';

const service = new ProjectService();

export const actions: ActionTree<IProjectState, {}> = {

  [FETCH_PROJECTS]({commit}) {
    return service.getProjects()
      .then(response => {
        commit(SET_PROJECTS, response.data);
      });
  },
  [FETCH_PROJECT]({commit}, id: string) {
    return service.getProject(id)
      .then(response => {
        commit(SET_PROJECT, response.data);
        return response.data;
      });
  },
  [FETCH_PROJECT_WITH_IMAGE]({commit, dispatch}, id: string) {
    return dispatch(FETCH_PROJECT, id)
      .then(project => {
        if (project.image) {
          // Set image for file uploader
          commit(SET_IMAGE_URL, {
            url: `./server/images/${project.image}`,
            name: project.image,
            loadingStatus: FileUploadStatus.NULL
          });
        }
      });
  },
  [FETCH_ADDONS]({commit}) {
    return service.getProjectAddons()
      .then(response => {
        commit(SET_LINES, response.data.lines);
        commit(SET_PROGRAMS, response.data.programs);
        commit(SET_DOMAINS, response.data.domains);
        commit(SET_TYPES, response.data.types);
        commit(SET_CUSTOMERS, response.data.customers);
        commit(FINISH_LOADING);
      });
  },
  [DELETE_PROJECT]({commit}, id: string) {
    return service.deleteProject(id)
      .then(() => router.push({name: Routes.Projects}));
  },
  [GENERATE_PRESENTATION]({getters}) {
    return PowerPointService.createProjectsPresentation(getters[PROJECTS]);
  },
  [GENERATE_PRESENTATION_SINGLE]({getters}) {
    return PowerPointService.createSingleProjectPresentation(getters[PROJECT]);
  },
  [SYNC_PARAMS]({commit}, query) {
    // Set filter values from query params
    Object.keys(query).forEach(key => {
      // Get all values for each filter key
      query[key].split(',').forEach((value: string) => {
        commit(SET_FILTER_VALUE, {key, value: Number(value)});
      });
    });
  }
};
