import Projects from './Projects.vue';
import store from '../../store/index';
import {mount} from '@vue/test-utils';

describe('Projects', () => {

  const wrapper = mount(Projects, {store});

  it('should render correct contents', () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});
