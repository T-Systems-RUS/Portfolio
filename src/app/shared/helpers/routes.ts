import {environment} from '../../../environments/environment';


export class Routes {

  IsProduction = environment.production;


  //Project
  getProjects;
  createProject;
  updateProject;
  history;
  archieve;


  //Employees
  getEmployees;
  getEmployee;


  //Technologies
  getTechnologies;

  
  //Roles
  getRoles;


  //file
  removeImage;

  constructor() {

    this.getProjects="/api/projects/";
    this.createProject="/api/projects/create/";
    this.updateProject="/api/projects/update/";
    this.archieve="/api/projects/archieve/";
    this.history="/api/projects/history/";

    this.getEmployees="/api/employees";
    this.getRoles="/api/roles";

    this.getTechnologies="/api/technologies";

    this.getRoles="/api/roles";

    this.removeImage="/api/images/remove";
  }


}
