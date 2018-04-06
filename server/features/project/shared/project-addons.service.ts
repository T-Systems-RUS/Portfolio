import {Scopes} from '../../../sequelize/Scopes';
import {Domain} from '../../../models/Domain';
import {Line} from '../../../models/Line';
import {Program} from '../../../models/Program';
import {Type} from '../../../models/Type';
import {Customer} from '../../../models/Customer';
import {ProjectFilterDto} from './project.dto';

const projectAddonsService = {

  getProjectFilterModel: async () => {
    const lines = await Line.scope([Scopes.WITH_PROGRAMS]).findAll();
    const programs = await Program.findAll({ order: [['name', 'ASC']] });
    const types = await Type.findAll();
    const domains = await Domain.findAll({ order: [['name', 'ASC']] });
    const customers = await  Customer.findAll({ order: [['name', 'ASC']] });

    const dto = new ProjectFilterDto();
    dto.lines = lines;
    dto.programs = programs;
    dto.types = types;
    dto.domains = domains;
    dto.customers = customers;

    return dto;
  }

};

export default projectAddonsService;
