import Projects from '../Projects.vue';
import ProjectCard from './ProjectCard.vue';
import store from '../../../store/index';
import {mount} from '@vue/test-utils';

describe('Project Card', () => {

  const projects = mount(Projects, {store});

  it('should render correct contents', () => {
    projects.vm.newProject();
    const project = projects.vm.projects[0];

    const wrapper = mount(ProjectCard, {
        propsData: {
          project: project
        },
        filters: {
          date(value) {
            return ""
          }
        }
    });

    expect(wrapper.props().project).toBe(project)

  });
});
