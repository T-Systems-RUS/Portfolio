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
  REMOVE_PROJECT_SCHEDULE,
  SET_FILTER_VALUE,
  SET_SEARCH_VALUE,
  SET_COMPLETION_VALUE,
  SET_SORT_VALUE,
  SET_SORT_REVERSE_VALUE,
  RESET_FILTERS,
  SET_PROJECT_IMAGE, SET_SCHEDULE, INCREMENT_VERSION, SET_ERROR_MESSAGE

} from './mutation-types';

import {ISchedule} from '../../../shared/interfaces/ISchedule';
import {ITechnology} from '../../../shared/interfaces/ITechnology';
import router, {Routes} from '../../../router';
import {ProjectQueryKey} from '../../../shared/enums/ProjectsQueryKey';
import {CompleteTypes} from '../../../shared/enums/CompleteTypes';
import {Dictionary} from 'vue-router/types/router';

function setQuery(query: Dictionary<string>) {
  router.push({name: Routes.Projects, query});
}

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
  setQuery(newQuery);
}

function setSearchQueryParam(search: string) {
  const newQuery = {...router.currentRoute.query};
  if (search) {
    newQuery[ProjectQueryKey.SEARCH] = search;
  } else {
    delete newQuery[ProjectQueryKey.SEARCH];
  }
  setQuery(newQuery);
}

function setCompletionQueryParam(completion: CompleteTypes) {
  const newQuery = {...router.currentRoute.query};
  if (completion === CompleteTypes.ALL) {
    delete newQuery[ProjectQueryKey.COMPLETION];
  } else {
    newQuery[ProjectQueryKey.COMPLETION] = completion;
  }
  setQuery(newQuery);
}

function setSortingQueryParam(sort: string) {
  const newQuery = {...router.currentRoute.query};
  if (sort === 'name') {
    delete newQuery[ProjectQueryKey.SORT];
  } else {
    newQuery[ProjectQueryKey.SORT] = sort;
  }
  setQuery(newQuery);
}

function setSortingReverseQueryParam(reverse: boolean) {
  const newQuery = {...router.currentRoute.query};
  if (reverse) {
    delete newQuery[ProjectQueryKey.SORT_REVERSE];
  } else {
    newQuery[ProjectQueryKey.SORT_REVERSE] = reverse.toString();
  }
  setQuery(newQuery);
}

function setFilterValue(state: IProjectState, key: string, value: string) {
  Vue.set(state.filter, key, Extension.toggleArray(state.filter[key], value));
  // Delete empty keys
  if (!state.filter[key].length) {
    Vue.delete(state.filter, key);
  }
}

function findScheduleIndexByEmployee(schedules:ISchedule[], schedule:ISchedule) {
  return schedules.findIndex(stateSchedule => stateSchedule.employee.id === schedule.employee.id);
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
    setFilterValue(state, payload.key, payload.value);
  },
  [SET_FILTER](state, payload: { key: string, value: string }) {
    setFilterValue(state, payload.key, payload.value);

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
  [SET_AUTOCOMPLETE_SEARCH](state, search: string) {
    state.autocompleteSearch = search;
  },
  // Sorting
  [SET_SORT_VALUE](state, sort: string) {
    state.sort = sort;
  },
  [SET_SORT](state, sort: string) {
    state.sort = sort;
    setSortingQueryParam(sort);
  },
  [SET_SORT_REVERSE_VALUE](state, reverse: boolean) {
    state.sortReverse = reverse;
  },
  [SET_SORT_REVERSE](state, reverse: boolean) {
    state.sortReverse = reverse;
    setSortingReverseQueryParam(reverse);
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
  [INCREMENT_VERSION](state) {
    state.project.version = state.project.version + 1;
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
  [SET_PROJECT_IMAGE](state, image: string) {
    state.project.image = image;
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

  [SET_SCHEDULE](state, schedule:ISchedule) {
    const scheduleIndex = findScheduleIndexByEmployee(state.project.schedules, schedule);
    state.project.schedules[scheduleIndex] = schedule;
  },
  [REMOVE_PROJECT_SCHEDULE](state, targetId: string) {
    state.project.schedules = state.project.schedules.filter(schedule => schedule.employee.id !== targetId);
  },
  [SET_ERROR_MESSAGE](state, payload: string) {
    state.errorMessage = payload;
  },
  [RESET_FILTERS](state) {
    state.filter = {};
    state.search = '';
    state.sort = 'name';
    state.sortReverse = true;
    state.completion = CompleteTypes.ALL;
    setQuery({});
  }
};
