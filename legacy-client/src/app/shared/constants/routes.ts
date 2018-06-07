const routes = {
  // ProjectChange
  getProjects: '/api/projects/',
  createProject: '/api/projects/create/',
  updateProject: '/api/projects/update/',
  archieve: '/api/projects/archieve/',
  deleteProject: '/api/projects/delete/',
  history: '/api/projects/history/',
  // Employees
  getEmployees: '/api/employees',
  // Technologies
  getTechnologies: '/api/technologies',
  doesTechnologyExist: '/api/technologies/exists/',
  createTechnology: '/api/technology/create',
  deleteTechnology: '/api/technology/delete/',
  updateTechnology: '/api//technology/update/',
  // Roles
  getRoles: '/api/roles',
  // file
  removeImage: '/api/images/remove',
  // presentation
  presentationImages: '/api/presentation/images/',

};

export default routes;
