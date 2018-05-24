import Vue from 'vue';
import Router from 'vue-router';
import Projects from '../components/projects/Projects.vue';
import Project from '../components/projects/Project/Project.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Projects
    },
    {
      path: '/projects/:id',
      component: Project,
      props: true
    }
  ]
});
