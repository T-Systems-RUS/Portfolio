import {Technology} from '../models/Technology';
import {Customer} from '../models/Customer';

const parseService = {

  parseShedules: (project, schedules) => schedules.map(schedule => Object.create({
    projectId: project.id,
    employeeId: schedule.employee.id,
    roleId: schedule.role.id,
    participation: schedule.participation,
    startdate: schedule.startdate
  })),

  parseTechnology: technologies => technologies.map(technology => new Technology({
    id: technology.id,
    name: technology.name,
    domain: technology.domain,
    image: technology.image,
    version: technology.version
  })),

  parseCustomers: customers => customers.map(customer => new Customer({
    id: customer.id,
    name: customer.name,
    image: customer.image,
    domainId: customer.domainId
  }))
};

export default parseService;
