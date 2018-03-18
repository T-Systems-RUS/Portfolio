import {mount} from '@vue/test-utils';
import Accordeon from './Accordeon.vue';

describe('Accordeon', () => {

  const wrapper = mount(Accordeon);

  it('change value on close button click', () => {
    wrapper.vm.toggleOpened();

    expect(wrapper.emitted()['update:opened']).toEqual([[false]]);
  });

});
