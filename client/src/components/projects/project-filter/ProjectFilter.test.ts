import ProjectFilter from './ProjectFilter.vue';
import {mount} from '@vue/test-utils';
import store from '../../../store/index';
import {TestMocks} from '../../../shared/classes/TestMocks';
import * as types from '../../../store/modules/projects/project-types';

describe('Project Filter', () => {

  const wrapper = mount(ProjectFilter, {
    store: store
  });
  const lines = [{ name: 'digital integration'}, { name: 'sap'}];

  it('should convert strings to same number of models for Checkboxes', () => {

    const model =  wrapper.vm.createModelForCheckboxes(lines);

    expect(model.length).toBe(lines.length);

  });

  it('model for checkboxes must be in correct format', () => {

    const model =  wrapper.vm.createModelForCheckboxes(lines);

    expect(model[0]).toMatchObject({value: 'digital integration', checked: false});

  });

  const line = TestMocks.TestLine('Automotive');
  const domain = TestMocks.TestDomain('Health');
  const program = TestMocks.TestProgram('Sales and Autosales');
  const customer = TestMocks.TestCustomer('1','BMW AG');
  const customer2 = TestMocks.TestCustomer('2','BMW AG');
  const technology = TestMocks.TestTechnology('1','React');
  const technology2 = TestMocks.TestTechnology('2','React');
  const project = TestMocks.TestProject();

  it('correctly filter by all properties', () => {

    store.commit(types.SET_PROJECTS, [project]);
    store.commit(types.SET_FILTER, { key: 'line', value: line.id});
    store.commit(types.SET_FILTER, { key: 'program', value: program.id});
    store.commit(types.SET_FILTER, { key: 'domain', value: domain.id})
    store.commit(types.SET_FILTER, { key: 'customers', value: customer.id});
    store.commit(types.SET_FILTER, { key: 'customers', value: customer2.id});
    store.commit(types.SET_FILTER, { key: 'technologies', value: technology.id});
    store.commit(types.SET_FILTER, { key: 'technologies', value: technology2.id});

    const filtered = store.getters[types.GET_PROJECTS];

    expect(filtered.length).toBe(1);

  });

  it('should correctly filter by line', () => {

    store.commit(types.SET_PROJECTS, [project]);
    store.commit(types.SET_FILTER, { key: 'line', value: line.id});


    const filtered = store.getters[types.GET_PROJECTS];

    expect(filtered[0].program.lineId).toBe(line.id);

  });

  it('should correctly filter by program', () => {

    store.commit(types.SET_PROJECTS, [project]);
    store.commit(types.SET_FILTER, { key: 'program', value: program.id});


    const filtered = store.getters[types.GET_PROJECTS];

    expect(filtered[0].program.id).toBe(program.id);

  });

  it('should correctly filter by domain', () => {

    store.commit(types.SET_PROJECTS, [project]);
    store.commit(types.SET_FILTER, { key: 'domain', value: domain.id});


    const filtered = store.getters[types.GET_PROJECTS];

    expect(filtered[0].domain.id).toBe(domain.id);

  });

  it('should correctly filter by customer', () => {

    store.commit(types.SET_PROJECTS, [project]);
    store.commit(types.SET_FILTER, { key: 'customers', value: customer.id});


    const filtered = store.getters[types.GET_PROJECTS];

    expect(filtered.length).toBe(1);

  });

  it('should correctly filter by technology', () => {
    const technology3 = TestMocks.TestTechnology('3','React');

    store.commit(types.SET_PROJECTS, [project]);
    store.commit(types.SET_FILTER, { key: 'technologies', value: technology.id});
    store.commit(types.SET_FILTER, { key: 'technologies', value: technology3.id});

    const filtered = store.getters[types.GET_PROJECTS];

    expect(filtered.length).toBe(0);

  });
});
