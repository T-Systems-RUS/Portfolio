import Vue from 'vue';
import Buefy from 'buefy';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import {i18n} from './i18n';
import './shared/http/interceptors/loading';

// Global styles
import './styles/styles.scss';

import './components/common';
import date from './shared/filters/Date';
import capitalize from './shared/filters/Capitalize';

Vue.filter('date', date);
Vue.filter('capitalize', capitalize);

Vue.use(Buefy);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  i18n,
  components: {App},
  template: '<App/>'
});
