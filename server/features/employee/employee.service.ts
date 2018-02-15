import {Employee} from '../../models/Employee';
import {Role} from '../../models/Role';
import {Scopes} from '../../models/Scopes';

const employeeService = {
  // GET list of projects with teamcount
  getEmployees: () => Employee.scope(Scopes.WITH_SCHEDULES).findAll({}),

  getRoles: async () => await Role.findAll({
    order: [
      ['name', 'ASC']
    ]
  })
};

export default employeeService;
