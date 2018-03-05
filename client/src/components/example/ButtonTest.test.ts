import ButtonTest from './ButtonTest.vue';
import store from '../../store/index';
import {mount} from '@vue/test-utils';

describe('ButtonTest', () => {

  const wrapper = mount(ButtonTest, {store});

  it('should render correct contents', () => {
    expect(wrapper.vm.$el.querySelector('button').textContent).toMatchSnapshot();
  });

  it('should press the button', () => {
    wrapper.vm.pressButton();
    expect(wrapper.vm.pressed).toEqual(true);
  });
});
