import Projects from './Projects.vue';
import store from '../../store/index';
import {mount} from '@vue/test-utils';

describe('Projects', () => {

  const wrapper = mount(Projects, {
    store: store,
    filters: {
      date(value) {
        return ""
      }
    }
  });

  it('should render correct contents', () => {
    wrapper.vm.newProject();
    expect(wrapper.vm.projects.length).toBe(1);
  });
});
