import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index'

// Global styles
import './styles/styles.scss';

import Checkbox from './components/common/Checkbox/Checkbox.vue';
import RadioButton from './components/common/RadioButton/RadioButton.vue';
import Autocomplete from './components/common/Autocomplete/Autocomplete.vue';
import CommonModal from './components/common/CommonModal/CommonModal.vue';
import Accordion from './components/common/Accordion/Accordion.vue';
import date from './shared/filters/Date';

Vue.component('Checkbox', Checkbox);
Vue.component('RadioButton', RadioButton);
Vue.component('Autocomplete', Autocomplete);
Vue.component('CommonModal', CommonModal);
Vue.component('Accordion', Accordion);
Vue.filter('date', date);


Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>',
});
