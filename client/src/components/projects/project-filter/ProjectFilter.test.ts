import ProjectFilter from './ProjectFilter.vue';
import {mount} from '@vue/test-utils';

describe('Project Filter', () => {

  const wrapper = mount(ProjectFilter);
  const lines = ['digital integration', 'sap'];

  it('should convert strings to same number of models for Checkboxes', () => {
       
    const model =  wrapper.vm.createModelForCheckboxes(lines);
    
    expect(model.length).toBe(lines.length);

  });

  it('model for checkboxes must be in correct format', () => {
       
    const model =  wrapper.vm.createModelForCheckboxes(lines);
    
    expect(model[0]).toMatchObject({name: 'digital integration', checked: false});

  });
});
