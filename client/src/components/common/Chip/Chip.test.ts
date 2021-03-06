import {mount} from '@vue/test-utils';
import Chip from './Chip.vue';
import store from '../../../store/index';

const name = 'Agile';

describe('Chips', () => {

  const wrapper = mount(Chip, {
    store,
    propsData: {
      name
    },
    filters: {
      date(value) {
        return ""
      }
    }
  });

  it('not active by default', () => {
    expect(wrapper.vm.isSelected).toEqual(false);
  });


  it('should render correct name property', () => {
    expect(wrapper.props().name).toBe(name);
  });
});
