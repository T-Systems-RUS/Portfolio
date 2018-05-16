import ProjectCard from './ProjectCard.vue';
import {IProject} from '../../../shared/interfaces/IProject';
import {ISchedule} from '../../../shared/interfaces/ISchedule';
import {mount} from '@vue/test-utils';
import {IProgram} from '../../../shared/interfaces/IProgram';
import {IType} from '../../../shared/interfaces/IType';
import {IDomain} from '../../../shared/interfaces/IDomain';
import {ICustomer} from '../../../shared/interfaces/ICustomer';
import {ILine} from '../../../shared/interfaces/ILine';
import {ITechnology} from '../../../shared/interfaces/ITechnology';
import {TestMocks} from '../../../shared/classes/TestMocks';

describe('Project Card', () => {

  it('should render correct contents', () => {


    const project = TestMocks.TestProject();

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
