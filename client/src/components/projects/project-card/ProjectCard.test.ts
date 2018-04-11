import ProjectCard from './ProjectCard.vue';
import {IProject} from '../../../shared/interfaces/IProject';
import {ISchedule} from '../../../shared/interfaces/ISchedule';
import {mount} from '@vue/test-utils';
import {IProgram} from '../../../shared/interfaces/IProgram';
import {IType} from '../../../shared/interfaces/IType';
import {IDomain} from '../../../shared/interfaces/IDomain';
import {ICustomer} from '../../../shared/interfaces/ICustomer';
import {ILine} from '../../../shared/interfaces/ILine';

describe('Project Card', () => {

  it('should render correct contents', () => {
    const type: IType = {
      id: '1',
      name: 'type',
      active: false,
      createdAt:new Date(),
      updatedAt: new Date()
    };

    const domain: IDomain = {
      id: '1',
      name: 'domain',
      active: false,
      createdAt:new Date(),
      updatedAt: new Date(),
      projects: [] as IProject[],
      customers: [] as ICustomer[]
    };

    const line: ILine = {
      id: '1',
      name: 'line',
      active: false,
      programs: [] as IProgram[],
      createdAt:new Date(),
      updatedAt: new Date()
    };

    const program: IProgram = {
      id: '1',
      name: 'program',
      active: false,
      line: line,
      projects: [] as IProject[],
      createdAt:new Date(),
      updatedAt: new Date()
    }

    const project: IProject = {
      id: '1',
      active: false,
      name: 'Test',
      description: '123',
      domain: domain,
      program: program,
      type: type,
      schedules: [] as ISchedule[],
      customers: [] as ICustomer[],
      startdate:new Date().toLocaleDateString(),
      enddate:new Date().toLocaleDateString(),
      createdAt:new Date(),
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
