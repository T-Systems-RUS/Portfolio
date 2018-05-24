import {
  SET_CUSTOMERS,
  SET_PROJECTS,
  SET_LINES,
  SET_PROGRAMS,
  SET_DOMAINS,
  SET_TYPES,
  FINISH_LOADING,
  SET_FILTER, SET_SEARCH
} from './project-types';
import {IProject} from '../../../shared/interfaces/IProject';
import {IProjectState} from './index';
import {ICustomer} from '../../../shared/interfaces/ICustomer';
import {ILine} from '../../../shared/interfaces/ILine';
import {IProgram} from '../../../shared/interfaces/IProgram';
import {IDomain} from '../../../shared/interfaces/IDomain';
import {IType} from '../../../shared/interfaces/IType';
import {Extension} from '../../../shared/classes/Extension';
import Vue from 'vue';
import {MutationTree} from 'vuex';

export const mutations: MutationTree<IProjectState> = {
  [SET_PROJECTS](state, payload: IProject[]) {
    state.projects = payload;
    state.loading = false;
  },
  [SET_FILTER](state, payload: { key: string, value: string }) {
    Vue.set(
      state.filter,
      payload.key,
      Extension.toggleArray(state.filter[payload.key], payload.value)
    );
    state.loading = false;
  },
  [SET_LINES](state, payload: ILine[]) {
    state.lines = payload;
  },
  [SET_PROGRAMS](state, payload: IProgram[]) {
    state.programs = payload;
  },
  [SET_DOMAINS](state, payload: IDomain[]) {
    state.domains = payload;
  },
  [SET_TYPES](state, payload: IType[]) {
    state.types = payload;
  },
  [SET_CUSTOMERS](state, payload: ICustomer[]) {
    state.customers = payload;
  },
  [FINISH_LOADING](state) {
    state.loading = false;
  },
  [SET_SEARCH](state, search: string){
    state.search = search;
  }
};
