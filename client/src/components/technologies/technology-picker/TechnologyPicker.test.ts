import {mount} from '@vue/test-utils';
import store from '../../../store/index';
import TechnologyPicker from './TechnologyPicker.vue';
import {FETCH_TECHNOLOGIES} from '../../../store/modules/technologies/action-types';

describe('TechnologyPicker', () => {

  const wrapper = mount(TechnologyPicker, {
    store: store,
    filters: {
      date(value) {
        return ""
      }
    }
  });

  it('should render correct contents', () => {
    const result = store.dispatch(FETCH_TECHNOLOGIES);
    result.then((response) => {
      expect(wrapper.vm.technologies.length).toBe(1);
    })
  });
});
