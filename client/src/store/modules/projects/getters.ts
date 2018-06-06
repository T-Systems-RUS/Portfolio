import {GetterTree} from 'vuex';
import {IProjectState} from './index';
import {Types} from './constant-types';
import {Util} from '../../../shared/classes/Util';
import {IModel} from '../../../shared/interfaces/IModel';
import {IProject} from '../../../shared/interfaces/IProject';
import {
  ADDONS,
  AUTOCOMPLETE_SEARCH,
  FILTER_VALUE,
  FILTERS,
  PROJECT_FILTER,
  PROJECT_NAMES,
  PROJECTS,
  SEARCH,
  SORT, SORT_FIELD_NAME, SORT_REVERSE
} from './getter-types';
import {TECHNOLOGIES} from '../technologies/getter-types';
import {IProjectFilter, IProjectFilterCheck} from '../../../shared/interfaces/shared/IProjectFilter';
import {FilterTypes} from './filter-types';

export const getters: GetterTree<IProjectState, {}> = {

  /**
   * Get properties only for
   * project filter
   * @param {IProjectState} state
   * @returns {{}}
   */
  [ADDONS](state, projectGetters) {
    return {
      [Types.PRODUCTION_LINE]: Util.checkFIltersInProjects(FilterTypes.LINE, state.lines, projectGetters[PROJECTS]),
      [Types.PROGRAM]: Util.checkFIltersInProjects(FilterTypes.PROGRAM, state.programs, projectGetters[PROJECTS]),
      [Types.DOMAIN]: Util.checkFIltersInProjects(FilterTypes.DOMAIN, state.domains, projectGetters[PROJECTS]),
      [Types.PROJECT_TYPE]: Util.checkFIltersInProjects(FilterTypes.TYPE, state.types, projectGetters[PROJECTS]),
      [Types.CUSTOMER]: Util.checkFIltersInProjects(FilterTypes.CUSTOMERS, state.customers, projectGetters[PROJECTS])
    };
  },

  [PROJECT_FILTER](state, projectGetters) {

    const addons: { [key: string]: any } = projectGetters[ADDONS];

    return Object.keys(addons).map(key => {
      const mapKey = Util.mapNameToProperty(key);

      //create model for project filter
      const model: IProjectFilter = {
        name: key,
        opened: state.accordion[key],
        items: addons[key].map((item: IModel) => ({
          value: item.name,
          //if technology selected in filter it will be marked active
          //else will be marked un active
          //for activated filters sync
          checked: state.filter[mapKey] ? state.filter[mapKey].indexOf(item.id) > -1 : false,
          id: item.id,
          active: item.active
        })) as IProjectFilterCheck[]
      };

      return model;
    })
  },
  [PROJECTS](state) {
    let projects = state.projects;

    // iterates over keys in filter
    for (const key in state.filter) {
      projects = projects.filter(project => {
        // only if filter property has values in it
        if (state.filter[key].length) {

          // if property is array many-to-many relations in db
          if (Array.isArray(project[key])) {
            // OR condition at least one element of project
            // in filter customers
            if (key === Util.mapNameToProperty(Types.CUSTOMER)) {
              return project[key].map((item: IModel) => item.id).some((id: string) =>
                state.filter[key].indexOf(id) > -1);
            }

            // AND condition
            // Exact technologies like in filter
            return project[key].map((item: IModel) => item.id).filter((id: string) =>
              state.filter[key].indexOf(id) > -1).length === state.filter[key].length;
          } else {
            // Project property is an object filter by object id
            // exception is line it is nested object
            const searchedId = key === Util.mapNameToProperty(Types.PRODUCTION_LINE)
              ? project[Util.mapNameToProperty(Types.PROGRAM)].lineId
              : project[key].id;

            return state.filter[key].indexOf(searchedId) > -1;
          }
        } else {
          return project;
        }
      });
    }

    // Check if projects match search filter
    if (state.search) {
      projects = projects.filter(project => project.name.toLowerCase().indexOf(state.search.toLowerCase()) > -1);
    }

    projects.sort(Util.sortByField(state.sort, state.sortReverse, true));

    return projects;
  },
  [SEARCH]: state => state.search,
  [AUTOCOMPLETE_SEARCH]: state => state.autocompleteSearch,
  [PROJECT_NAMES](state) {
    return state.projects
      .filter(project => project.name.toLowerCase().indexOf(state.autocompleteSearch.toLowerCase()) > -1)
      .map(project => project.name);
  },
  [FILTERS]: state => state.filter,
  [FILTER_VALUE]: (state, projectGetters) => (key: string, id: number) => {
    const keyMap: { [key: string]: string } = {
      customers: Types.CUSTOMER,
      domain: Types.DOMAIN,
      line: Types.PRODUCTION_LINE,
      program: Types.PROGRAM,
      type: Types.PROJECT_TYPE
    };
    const arrayToSearch = key === 'technologies' ? projectGetters[TECHNOLOGIES] : projectGetters[ADDONS][keyMap[key]];
    const item = arrayToSearch.filter((filtered: IProject) => Number(filtered.id) === id)[0];
    return item ? item.name : '';
  },
  [SORT]: state => state.sort,
  [SORT_REVERSE]: state => state.sortReverse,
  [SORT_FIELD_NAME]: () => (key: string) => {
    const sortMap: { [key: string]: string } = {
      name: 'Name',
      'program.line.name': 'Production line',
      'schedules.length': 'Team size',
      updatedAt: 'Date modified'
    };
    return sortMap[key];
  },
};
