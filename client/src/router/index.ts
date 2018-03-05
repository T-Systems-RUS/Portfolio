import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '../components/root/start/Welcome.vue';
import ButtonTest from '../components/example/ButtonTest.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/button-test',
      name: 'ButtonTest',
      component: ButtonTest,
    },
  ],
});
