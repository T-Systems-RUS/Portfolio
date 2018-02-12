import * as models from '../../models/index';

const employeeService = {
  // GET list of projects with teamcount
  getEmployees: () => models.Employee.findAll({
    include: [{
      as: 'schedules',
      model: models.Schedule
    }]
  }),
  getRoles: async () => await models.Role.findAll({
    order: [
      ['name', 'ASC']
    ]
  })
};

export default employeeService;
