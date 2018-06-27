import Vue from 'vue';
import Router from 'vue-router';
import Projects from '../components/projects/Projects.vue';
import Project from '../components/projects/Project/Project.vue';
import ProjectChange from '../components/projects/ProjectChange/ProjectChange.vue';
import store from '../store';
import {SYNC_PARAMS} from '../store/modules/projects/action-types';

Vue.use(Router);

export enum Routes {
  Projects = 'Projects',
  Project = 'Project'
}

const router = new Router({
  routes: [
    {
      path: '/',
      component: Projects,
      name: Routes.Projects,
      beforeEnter(to, _from, next) {
        store.dispatch(SYNC_PARAMS, to.query);
        next();
      }
    },
    {
      path: '/projects/:id',
      component: Project,
      props: true,
      name: Routes.Project
    },
    {
      path: '/projects/:id/edit',
      component: ProjectChange,
      props: true
    }
  ]
});

export default router;
