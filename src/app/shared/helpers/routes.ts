import {environment} from '../../../environments/environment';


export class Routes {

  IsProduction = environment.production;


  //Project
  getProjects;
  createProject;
  updateProject;


  //Employees
  getEmployees;
  getEmployee;


  //Technologies
  getTechnologies;

  
  //Roles
  getRoles;

  constructor() {

    this.getProjects="/api/projects/";
    this.createProject="/api/projects/create/";
    this.updateProject="/api/projects/update/";

    this.getEmployees="/api/employees";

    this.getTechnologies="/api/technologies";

    this.getRoles="/api/roles";
  }


}
