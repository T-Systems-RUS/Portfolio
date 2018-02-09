var models = require('../../models');

var employeeService = {};

// GET list of projects with teamcount
employeeService.getEmployees =  () => {
  return models.Employee.findAll({
      include: [{
        as: 'schedules',
        model: models.Schedule
      },
      ]
    }
  )
};

employeeService.getRoles = async () => {
  return await  models.Role.findAll({
    order: [
      ['name', 'ASC']
    ]
  })
};

module.exports = employeeService;
