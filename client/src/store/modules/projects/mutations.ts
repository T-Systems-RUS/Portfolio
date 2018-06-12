import Vue from 'vue';
import {MutationTree} from 'vuex';
import {IProject} from '../../../shared/interfaces/IProject';
import {IProjectState} from './index';
import {ICustomer} from '../../../shared/interfaces/ICustomer';
import {ILine} from '../../../shared/interfaces/ILine';
import {IProgram} from '../../../shared/interfaces/IProgram';
import {IDomain} from '../../../shared/interfaces/IDomain';
import {IType} from '../../../shared/interfaces/IType';
import {Extension} from '../../../shared/classes/Extension';
import {
  FINISH_LOADING,
  SET_ACCORDION,
  SET_AUTOCOMPLETE_SEARCH,
  SET_CUSTOMERS,
  SET_DOMAINS,
  SET_FILTER,
  SET_LINES,
  SET_PROGRAMS,
  SET_PROJECTS,
  SET_PROJECT,
  SET_SEARCH,
  SET_SORT,
  SET_SORT_REVERSE,
  SET_TYPES,
  SET_ROLES,
  SET_PROJECT_NAME,
  SET_PROJECT_PROGRAM,
  SET_PROJECT_DOMAIN,
  SET_PROJECT_TYPE,
  SET_PROJECT_START_DATE,
  SET_PROJECT_END_DATE,
  SET_PROJECT_DESCRIPTION,
  SET_PROJECT_CUSTOMERS,
  SET_PROJECT_SCHEDULES,
  SET_PROJECT_TECHNOLOGIES, SET_PROJECT_PSS, SET_COMPLETION
} from './mutation-types';
import {IRole} from '../../../shared/interfaces/IRole';
import {ISchedule} from '../../../shared/interfaces/ISchedule';
import {ITechnology} from "../../../shared/interfaces/ITechnology";

export const mutations: MutationTree<IProjectState> = {
  [SET_ACCORDION](state, payload: { key: string, value: boolean }) {
    Vue.set(
      state.accordion,
      payload.key,
      payload.value
    );
    state.loading = false;
  },
  [SET_PROJECTS](state, payload: IProject[]) {
    state.projects = payload;
    state.loading = false;
  },
  [SET_PROJECT](state, payload: IProject) {
    state.project = payload;
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
  // Search
  [SET_SEARCH](state, search: string) {
    state.search = search;
  },
  // Sorting
  [SET_AUTOCOMPLETE_SEARCH](state, search: string) {
    state.autocompleteSearch = search;
  },
  [SET_SORT](state, sort: string) {
    state.sort = sort;
  },
  [SET_COMPLETION](state, completion: string) {
    state.completion = completion;
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
  [SET_SORT_REVERSE](state, reverse: boolean) {
    state.sortReverse = reverse;
  },
  [SET_ROLES](state, payload: IRole[]) {
    state.roles = payload;
    state.loading = false;
  },
  [SET_PROJECT_NAME](state, name: string) {
    state.project.name = name;
  },
  [SET_PROJECT_PROGRAM](state, program: IProgram) {
    state.project.program = program;
  },
  [SET_PROJECT_DOMAIN](state, domain: IDomain) {
    state.project.domain = domain;
  },
  [SET_PROJECT_TYPE](state, type: IType) {
    state.project.type = type;
  },
  [SET_PROJECT_START_DATE](state, startDate: string) {
    state.project.startdate = startDate;
  },
  [SET_PROJECT_END_DATE](state, endDate: string) {
    state.project.enddate = endDate;
  },
  [SET_PROJECT_DESCRIPTION](state, description: string) {
    state.project.description = description;
  },
  [SET_PROJECT_PSS](state, pss: number) {
    state.project.pss = pss;
  },
  [SET_PROJECT_CUSTOMERS](state, customers: ICustomer[]) {
    state.project.customers = customers;
  },
  [SET_PROJECT_SCHEDULES](state, schedules: ISchedule[]) {
    state.project.schedules = schedules;
  },
  [SET_PROJECT_TECHNOLOGIES](state, technologies: ITechnology[]) {
    state.project.technologies = technologies;
  }
};
