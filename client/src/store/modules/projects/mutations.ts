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
  SET_PROJECT_NAME,
  SET_PROJECT_PROGRAM,
  SET_PROJECT_DOMAIN,
  SET_PROJECT_TYPE,
  SET_PROJECT_START_DATE,
  SET_PROJECT_END_DATE,
  SET_PROJECT_DESCRIPTION,
  SET_PROJECT_CUSTOMERS,
  SET_PROJECT_SCHEDULES,
  SET_PROJECT_TECHNOLOGIES,
  SET_PROJECT_PSS,
  SET_COMPLETION,
  SET_SCHEDULE_DATE,
  REMOVE_PROJECT_SCHEDULE,
  SET_SCHEDULE_PARTICIPATION,
  SET_SCHEDULE_ROLE, SET_FILTER_VALUE, SET_SEARCH_VALUE, SET_COMPLETION_VALUE
} from './mutation-types';
import {IRole} from '../../../shared/interfaces/IRole';
import {ISchedule} from '../../../shared/interfaces/ISchedule';
import {ITechnology} from '../../../shared/interfaces/ITechnology';
import router, {Routes} from '../../../router';
import {ProjectQueryKey} from "../../../shared/enums/ProjectsQueryKey";
import {CompleteTypes} from "../../../shared/enums/CompleteTypes";

// Set query params to the filter values
function setFilterQueryParams(key: string, value: string) {
  // Get current query params
  const newQuery = {...router.currentRoute.query};
  // Check if such key exists
  if (router.currentRoute.query[key]) {
    // Get all values for this key
    const values = router.currentRoute.query[key].split(',');
    const valueIndex = values.indexOf(value);
    // Remove if it's already present
    if (valueIndex > -1) {
      values.splice(valueIndex, 1);
      if (values.length) {
        newQuery[key] = values.join(',');
      } else {
        // Remove the key if there's no more values
        delete newQuery[key];
      }
    } else {
      values.push(value);
      // Add new value otherwise
      newQuery[key] = values.join(',');
    }
  } else {
    // Create a key if it isn't present
    newQuery[key] = value;
  }
  // Set new query params
  router.push({name: Routes.Projects, query: newQuery});
}

function setSearchQueryParam(search: string) {
  // Get current query params
  const newQuery = {...router.currentRoute.query};
  if (search) {
    newQuery[ProjectQueryKey.SEARCH] = search;
  } else {
    delete newQuery[ProjectQueryKey.SEARCH];
  }
  // Set new query params
  router.push({name: Routes.Projects, query: newQuery});
}

function setCompletionQueryParam(completion: CompleteTypes) {
  // Get current query params
  const newQuery = {...router.currentRoute.query};
  if (completion === CompleteTypes.ALL) {
    delete newQuery[ProjectQueryKey.COMPLETION];
  } else {
    newQuery[ProjectQueryKey.COMPLETION] = completion;
  }
  // Set new query params
  router.push({name: Routes.Projects, query: newQuery});
}

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
  [SET_FILTER_VALUE](state, payload: { key: string, value: string }) {
    Vue.set(state.filter, payload.key, Extension.toggleArray(state.filter[payload.key], payload.value));
  },
  [SET_FILTER](state, payload: { key: string, value: string }) {
    Vue.set(state.filter, payload.key, Extension.toggleArray(state.filter[payload.key], payload.value));

    setFilterQueryParams(payload.key, payload.value.toString());

    state.loading = false;
  },
  // Search
  [SET_SEARCH_VALUE](state, search: string) {
    state.search = search;
  },
  [SET_SEARCH](state, search: string) {
    state.search = search;
    setSearchQueryParam(search);
  },
  // Sorting
  [SET_AUTOCOMPLETE_SEARCH](state, search: string) {
    state.autocompleteSearch = search;
  },
  [SET_SORT](state, sort: string) {
    state.sort = sort;
  },
  [SET_COMPLETION_VALUE](state, completion: CompleteTypes) {
    state.completion = completion;
  },
  [SET_COMPLETION](state, completion: CompleteTypes) {
    state.completion = completion;
    setCompletionQueryParam(completion);
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
  },
  [SET_SCHEDULE_PARTICIPATION](state, payload: { targetId: string, participation: number }) {
    state.project.schedules = Extension.setScheduleParticipation(
      state.project.schedules,
      payload.targetId,
      payload.participation
    );
  },
  [SET_SCHEDULE_DATE](state, payload: { key: string, targetId: string, date: Date }) {
    state.project.schedules = Extension.setScheduleDate(
      state.project.schedules,
      payload.key,
      payload.targetId,
      payload.date
    );
  },
  [SET_SCHEDULE_ROLE](state, payload: { targetId: string, role: IRole }) {
    state.project.schedules = Extension.setScheduleRole(state.project.schedules, payload.targetId, payload.role);
  },
  [REMOVE_PROJECT_SCHEDULE](state, targetId: string) {
    state.project.schedules = state.project.schedules.filter(schedule => schedule.employee.id !== targetId);
  }
};
