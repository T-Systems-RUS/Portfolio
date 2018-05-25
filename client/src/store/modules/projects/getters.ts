import {GetterTree} from 'vuex';
import {IProjectState} from './index';
import {Types} from './constant-types';
import {Util} from '../../../shared/classes/Util';
import {IModel} from '../../../shared/interfaces/IModel';
import {IProject} from '../../../shared/interfaces/IProject';
import {ADDONS, AUTOCOMPLETE_SEARCH, FILTER_VALUE, FILTERS, PROJECT_NAMES, PROJECTS, SEARCH} from './getter-types';

export const getters: GetterTree<IProjectState, {}> = {

  /**
   * Get properties only for
   * project filter
   * @param {IProjectState} state
   * @returns {{}}
   */
  [ADDONS](state) {
    return {
      [Types.PRODUCTION_LINE]: state.lines,
      [Types.PROGRAM]: state.programs,
      [Types.DOMAIN]: state.domains,
      [Types.PROJECT_TYPE]: state.types,
      [Types.CUSTOMER]: state.customers,
    };
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
    const keyMap: {[key: string]: string} = {
      customers: 'Customers',
      domain: 'Domain',
      line: 'Production line',
      program: 'Program',
      type: 'Project type'
    };
    const project = projectGetters[ADDONS][keyMap[key]].filter((proj:IProject) => Number(proj.id) === id)[0];
    return project ? project.name : '';
  }
};
