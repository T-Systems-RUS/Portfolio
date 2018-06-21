import Vue from 'vue';
import Router from 'vue-router';
import Projects from '../components/projects/Projects.vue';
import Project from '../components/projects/Project/Project.vue';
import ProjectChange from '../components/projects/ProjectChange/ProjectChange.vue';

Vue.use(Router);

export enum Routes {
  Projects = 'Projects',
  Project = 'Project',
  Change = 'Change'
}

export default new Router({
  routes: [
    {
      path: '/',
      component: Projects,
      name: Routes.Projects
    },
    {
      path: '/projects/:id',
      component: Project,
      props: true,
      name: Routes.Project
    },
    {
      path: '/projects/:id/:mode',
      component: ProjectChange,
      props: true,
      name: Routes.Change
    }
  ]
});
