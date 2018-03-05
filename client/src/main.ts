import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store'

// Global styles
import './styles/styles.scss';

import Checkbox from './components/common/Checkbox.vue';
Vue.component('Checkbox', Checkbox);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>',
});
