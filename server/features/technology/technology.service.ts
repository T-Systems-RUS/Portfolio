import {Technology} from '../../models/Technology';
import {Scopes} from '../../sequelize/Scopes';
import * as Sequelize from 'sequelize';

const op = Sequelize.Op;

const technologyService = {

  // GET list of projects with teamcount
  getTechnologies: () => Technology.findAll({
    order: [
      ['name', 'ASC'],
    ]
  }),

  // GET check if project exists
  doesTechnologyExist: (name, id) => {
    id = id || '';
    return Technology.count({where: {name: name, id: {[op.ne]: id}}})
      .then(count => count !== 0)
      .catch(error => {
        console.log(error);
      });
  },

  // POST create new technology
  createTechnology: technology => Technology.create({
    name: technology.name,
    domain: technology.domain,
    active: 0,
    image: technology.image,
    version: technology.version || ''
  })
    .then(newTechnology => newTechnology)
    .catch(error => {
      throw new Error(error);
    }),

// PUT Update technology
  updateTechnology: technology => Technology.update({
    name: technology.name,
    domain: technology.domain,
    active: 0,
    image: technology.image,
    version: technology.version || ''
  }, {where: {id: technology.id}})
    .then(newTechnology => newTechnology)
    .catch(error => {
      throw new Error(error);
    }),

  deleteTechnology: async id => {
    try {
      const technology = await Technology.scope(Scopes.WITH_PROJECTS).findOne({where: {id: id}});
      technology.$remove('projects', technology.projects);
      return await Technology.destroy({where: {id: id}, cascade: true});
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};

export default technologyService;
