import {Technology} from '../models/Technology';

const parseService = {

  parseShedules: (project, schedules) => schedules.map(schedule => Object.create({
    projectid: project.id,
    employeeid: schedule.employee.id,
    roleid: schedule.role.id
  })),

  parseTechnology: technologies => technologies.map(technology => new Technology({
    id: technology.id,
    name: technology.name,
    domain: technology.domain,
    image: technology.image,
    version: technology.version
  }))
};

export default parseService;
