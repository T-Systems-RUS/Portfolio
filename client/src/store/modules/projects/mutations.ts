import {SET_CUSTOMERS, SET_PROJECTS, SET_LINES, SET_PROGRAMS, SET_DOMAINS, SET_TYPES} from './project-types';
import {IProject} from '../../../shared/interfaces/IProject';
import {IProjectState} from './index';
import {ICustomer} from '../../../shared/interfaces/ICustomer';
import {ILine} from '../../../shared/interfaces/ILine';
import {IProgram} from '../../../shared/interfaces/IProgram';
import {IDomain} from '../../../shared/interfaces/IDomain';
import {IType} from '../../../shared/interfaces/IType';

export const mutations = {
  [SET_PROJECTS](state: IProjectState, payload: IProject[]) {
    state.projects = payload;
    state.loading = false;
  },
  [SET_LINES](state: IProjectState, payload: ILine[]) {
    state.lines = payload;
    state.loading = false;
  },
  [SET_PROGRAMS](state: IProjectState, payload: IProgram[]) {
    state.programs = payload;
    state.loading = false;
  },
  [SET_DOMAINS](state: IProjectState, payload: IDomain[]) {
    state.domains = payload;
    state.loading = false;
  },
  [SET_TYPES](state: IProjectState, payload: IType[]) {
    state.types = payload;
    state.loading = false;
  },
  [SET_CUSTOMERS](state: IProjectState, payload: ICustomer[]) {
    state.customers = payload;
    state.loading = false;
  }
};
