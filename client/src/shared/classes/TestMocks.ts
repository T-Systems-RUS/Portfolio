import {IProject} from '../interfaces/IProject';
import {ICustomer} from '../interfaces/ICustomer';
import {IDomain} from '../interfaces/IDomain';
import {IType} from '../interfaces/IType';
import {IProgram} from '../interfaces/IProgram';
import {ILine} from '../interfaces/ILine';
import {ISchedule} from '../interfaces/ISchedule';
import {ITechnology} from '../interfaces/ITechnology';
import {IEmployee} from '../interfaces/IEmployee';

export class TestMocks {

  static TestDomain(domainName:string = 'Health') {
    const domain: IDomain = {
      id: '1',
      name: domainName,
      active: false,
      createdAt:new Date(),
      updatedAt: new Date(),
      projects: [] as IProject[],
      customers: [] as ICustomer[]
    }

    return domain;
  }

  static TestTechnology(techId:string = '1', techName:string = 'React') {
    const technology: ITechnology = {
      id: techId,
      name: techName,
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

  static TestType(typeName:string = 'ProjectChange') {
    const type: IType = {
      id: '1',
      name: typeName,
      active: false,
      createdAt:new Date(),
      updatedAt: new Date()
    }

    return type;
  }

  static TestLine(lineName:string = 'Automotive') {
    const line: ILine = {
      id: '1',
      name: lineName,
      active: false,
      programs: [] as IProgram[],
      createdAt:new Date(),
      updatedAt: new Date()
    };

    return line;
  }

  static TestProgram(programName:string = 'Sales and Autosales') {
    const line = this.TestLine();

    const program: IProgram = {
      id: '1',
      name: programName,
      active: false,
      line: line,
      lineId: '1',
      projects: [] as IProject[],
      createdAt:new Date(),
      updatedAt: new Date()
    };

    return program;
  }

  static TestCustomer(customerId:string = '1', customerName:string = 'BMW AG') {
    const domain = this.TestDomain();

    const customer: ICustomer = {
      id: customerId,
      name: customerName,
      active: false,
      domain: domain,
      projects: [],
      createdAt:new Date(),
      updatedAt: new Date()
    };

    return customer;
  }

  static TestEmployee(employeeId:string = '1', employeeLastName:string = 'Fedorov') {
    const technology = this.TestTechnology();

    const employee: IEmployee = {
      id: employeeId,
      lastname: employeeLastName,
      active: false,
      firstname: 'Artur',
      schedules: [] as ISchedule[],
      technologies: [technology],
      createdAt:new Date(),
      updatedAt: new Date()
    };

    return employee;
  }

  static TestProject(projectName:string = 'PPA') {
    const domain = this.TestDomain();
    const program = this.TestProgram();
    const type = this.TestType();
    const customer1 = this.TestCustomer();
    const customer2 = this.TestCustomer('2','Daimler');
    const technology1 = this.TestTechnology();
    const technology2 = this.TestTechnology('2', 'Angular 6');


    const project: IProject = {
      id: '1',
      active: false,
      name: projectName ,
      description: '123',
      domain: domain,
      program: program,
      image: '',
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
