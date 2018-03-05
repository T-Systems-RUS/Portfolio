import Vue from 'vue';
import Router from 'vue-router';
import Projects from '../components/projects/Projects.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Projects',
      component: Projects,
    }
  ]
});
