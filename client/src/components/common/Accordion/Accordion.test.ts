import {mount} from '@vue/test-utils';
import Accordion from './Accordion.vue';

describe('Accordion', () => {

  const wrapper = mount(Accordion);

  it('change value on close button click', () => {
    wrapper.vm.toggleOpened();

    expect(wrapper.emitted()['update:opened']).toEqual([[false]]);
  });

});
