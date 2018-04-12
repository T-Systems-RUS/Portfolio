import Projects from './Projects.vue';
import store from '../../store/modules/index';
import {FETCH_PROJECTS} from '../../store/modules/projects/project-types';
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
    const result = store.dispatch(FETCH_PROJECTS);
    result.then((responce) => {
      expect(wrapper.vm.projects.length).toBe(1);
    })
  });
});
