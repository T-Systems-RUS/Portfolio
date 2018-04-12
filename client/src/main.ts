import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/modules/index'

// Global styles
import './styles/styles.scss';

import Checkbox from './components/common/Checkbox/Checkbox.vue';
import date from './shared/filters/Date';

Vue.component('Checkbox', Checkbox);
Vue.filter('date', date);


Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>',
});
