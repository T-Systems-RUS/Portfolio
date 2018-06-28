import {ActionTree} from 'vuex';
import {ProjectService} from './project.service';
import {IProjectState} from './index';
import {Routes} from './../../../router/index';
import router from './../../../router/index';


import {
  CHECK_PROJECT_EXISTENCE, CHECK_PROJECT_EXISTENCE_UPDATE,
  CREATE_PROJECT,
  DELETE_PROJECT, EDIT_PROJECT,
  FETCH_ADDONS,
  FETCH_PROJECT,
  FETCH_PROJECT_WITH_IMAGE,
  FETCH_PROJECTS,
  GENERATE_PRESENTATION, GENERATE_PRESENTATION_SINGLE, REMOVE_PROJECT_IMAGE, UPDATE_PROJECT_IMAGE
} from './action-types';

import {
  FINISH_LOADING, SET_CUSTOMERS, SET_DOMAINS, SET_LINES, SET_PROGRAMS, SET_PROJECT, SET_PROJECT_IMAGE, SET_PROJECTS,
  SET_TYPES
} from './mutation-types';
import {PowerPointService} from './PowerPointService';
import {PROJECT, PROJECTS} from './getter-types';
import {SET_FILE_COMPLETED, SET_FILE_LOADING, SET_IMAGE_URL} from '../../../components/common/FileUploader/fileUploadStore/mutation-types';
import {FileUploadStatus, IFileUpload} from '../../../components/common/FileUploader/IFileUploadList';
import {FileUploaderService} from '../../../components/common/FileUploader/FileUploaderService';

const service = new ProjectService();

export const actions: ActionTree<IProjectState, {}> = {

  [FETCH_PROJECTS]({commit}) {
    return service.getProjects()
      .then(response => {
        commit(SET_PROJECTS, response.data);
      });
  },

  [FETCH_PROJECT]({commit}, id:string) {
    return service.getProject(id)
      .then(response => {
        commit(SET_PROJECT, response.data);
        return response.data;
      });
  },

  [FETCH_PROJECT_WITH_IMAGE]({commit, dispatch}, id:string) {
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

  [CHECK_PROJECT_EXISTENCE]({commit}, name:string) {
    return service.doesProjectExist(name)
      .then(response => response.data);
  },

  [CHECK_PROJECT_EXISTENCE_UPDATE]({commit}, payload: {name:string, id:string}) {
    return service.doesProjectWithIdExist(payload.name, payload.id)
      .then(response => response.data);
  },

  [CREATE_PROJECT]({state}) {
    return service.createProject(state.project)
      .then(() => router.push({name: Routes.Projects}));
  },

  [EDIT_PROJECT]({state}) {
    return service.editProject(state.project)
      .then((response) => router.push({name: Routes.Project, params: { id: String(response.data.id) }}));
  },

  [DELETE_PROJECT]({commit}, id:string) {
    return service.deleteProject(id)
      .then(() => router.push({name: Routes.Projects}));
  },

  [GENERATE_PRESENTATION]({getters}) {
    return PowerPointService.createProjectsPresentation(getters[PROJECTS]);
  },

  [GENERATE_PRESENTATION_SINGLE]({getters}) {
    return PowerPointService.createSingleProjectPresentation(getters[PROJECT]);
  },

  [REMOVE_PROJECT_IMAGE]({commit}, image: string) {
    return service.removeImage<object>({'image': image})
      .then(() => commit(SET_PROJECT_IMAGE, ''));
  },

  [UPDATE_PROJECT_IMAGE]({commit}, payload: { id:string, image: string }) {
    return service.updateImage<Object>(payload)
      .then(() => commit(SET_PROJECT_IMAGE, payload.image));
  }
};
