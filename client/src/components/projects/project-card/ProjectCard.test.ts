import ProjectCard from './ProjectCard.vue';
import {IProject} from '../../../shared/interfaces/IProject';
import {ISchedule} from '../../../shared/interfaces/ISchedule';
import {mount} from '@vue/test-utils';

describe('Project Card', () => {

  it('should render correct contents', () => {
    const project: IProject = {
      id: '1',
      name: 'Test',
      description: '123',
      domain: 'Test domain',
      line: 'auto',
      schedules: [] as ISchedule[],
      startdate: new Date().toLocaleDateString(),
      enddate: new Date().toLocaleDateString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

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

    expect(wrapper.props().project).toMatchObject(project);

  });
});
