import {IProject} from '../interfaces/IProject';
import {ICustomer} from '../interfaces/ICustomer';
import {IDomain} from '../interfaces/IDomain';
import {IType} from '../interfaces/IType';
import {IProgram} from '../interfaces/IProgram';
import {ILine} from '../interfaces/ILine';
import {ISchedule} from '../interfaces/ISchedule';
import {ITechnology} from '../interfaces/ITechnology';

export class TestMocks {

  static TestDomain(d:string = 'Automotive') {
    const domain: IDomain = {
      id: '1',
      name: d,
      active: false,
      createdAt:new Date(),
      updatedAt: new Date(),
      projects: [] as IProject[],
      customers: [] as ICustomer[]
    }

    return domain;
  }

  static TestTechnology(t:string = 'Agile') {
    const technology: ITechnology = {
      id: '1',
      name: t,
      domain: 'backend',
      active: false,
      image: '',
      version: '1',
      projects: [],
      createdAt:new Date(),
      updatedAt: new Date()
    };

    return technology;
  }

  static TestType(t:string = 'Project') {
    const type: IType = {
      id: '1',
      name: t,
      active: false,
      createdAt:new Date(),
      updatedAt: new Date()
    }

    return type;
  }

  static TestLine(l:string = 'Automotive') {
    const line: ILine = {
      id: '1',
      name: l,
      active: false,
      programs: [] as IProgram[],
      createdAt:new Date(),
      updatedAt: new Date()
    };

    return line;
  }

  static TestProgram(p:string = 'Sales and Autosales') {
    const line = this.TestLine();

    const program: IProgram = {
      id: '1',
      name: p,
      active: false,
      line: line,
      projects: [] as IProject[],
      createdAt:new Date(),
      updatedAt: new Date()
    };

    return program;
  }

  static TestCustomer(c:string = 'BMW AG') {
    const domain = this.TestDomain();

    const customer: ICustomer = {
      id: 'id',
      name: c,
      active: false,
      domain: domain,
      projects: [],
      createdAt:new Date(),
      updatedAt: new Date()
    };

    return customer;
  }

  static TestProject(p:string = 'PPA') {
    const domain = this.TestDomain();
    const program = this.TestProgram();
    const type = this.TestType();
    const customer1 = this.TestCustomer();
    const customer2 = this.TestCustomer('Daimler');
    const technology1 = this.TestTechnology();
    const technology2 = this.TestTechnology('React');

    const project: IProject = {
      id: '1',
      active: false,
      name: p,
      description: '123',
      domain: domain,
      program: program,
      type: type,
      schedules: [] as ISchedule[],
      customers: [customer1, customer2],
      technologies: [technology1, technology2],
      startdate:new Date().toLocaleDateString(),
      enddate:new Date().toLocaleDateString(),
      createdAt:new Date(),
      updatedAt: new Date()
    };

    return project;
  }
}
