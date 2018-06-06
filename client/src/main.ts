import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index'

// Global styles
import './styles/styles.scss';

import Checkbox from './components/common/Checkbox/Checkbox.vue';
import Autocomplete from './components/common/Autocomplete/Autocomplete.vue';
import CommonModal from './components/common/CommonModal/CommonModal.vue';
import date from './shared/filters/Date';
import capitalize from './shared/filters/Capitalize';

Vue.component('Checkbox', Checkbox);
Vue.component('Autocomplete', Autocomplete);
Vue.component('CommonModal', CommonModal);
Vue.filter('date', date);
Vue.filter('capitalize', capitalize);


Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>',
});
