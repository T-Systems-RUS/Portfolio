import {environment} from '../../../environments/environment';


export class Routes {

  IsProduction = environment.production;


  //Project
  getProjects;
  createProject;
  updateProject;
  history;
  archieve;
  deleteProject;


  //Employees
  getEmployees;
  getEmployee;


  //Technologies
  getTechnologies;
  createTechnology;
  deleteTechnology;
  
  //Roles
  getRoles;


  //file
  removeImage;
  //presentation
  presentationImages;

  constructor() {

    this.getProjects="/api/projects/";
    this.createProject="/api/projects/create/";
    this.updateProject="/api/projects/update/";
    this.archieve="/api/projects/archieve/";
    this.deleteProject="/api/projects/delete/";
    this.history="/api/projects/history/";

    this.getEmployees="/api/employees";
    this.getRoles="/api/roles";

    this.getTechnologies="/api/technologies";
    this.createTechnology="/api/technology/create";
    this.deleteTechnology="/api/technology/delete/"

    this.getRoles="/api/roles";

    this.removeImage="/api/images/remove";
    this.presentationImages='/api/presentation/images/';
  }


}
