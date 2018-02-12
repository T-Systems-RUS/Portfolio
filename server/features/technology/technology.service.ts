import * as models from '../../models/index';
import * as Sequelize from 'sequelize';

const op = Sequelize.Op;

const technologyService = {

  // GET list of projects with teamcount
  getTechnologies: () => {
    try {
      return models.Technology.findAll({
          order: [
            ['name', 'ASC'],
          ]
        }
      );
    } catch (e) {
      console.log('fuck ', e);
    }
  },

  // GET check if project exists
  doesTechnologyExist: (name, id) => {
    id = id || '';
    return models.Technology.count({where: {name: name, id: {[op.ne]: id}}})
      .then(count => count !== 0)
      .catch(error => {
        console.log(error);
      });
  },

  // POST create new technology
  createTechnology: technology => models.Technology.create({
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
  updateTechnology: technology => models.Technology.update({
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
      const technology = await models.Technology.findOne({where: {id: id}, include: [{as: 'projects', model: models.Project}]});
      technology.removeProjects(technology.projects);
      return await models.Technology.destroy({where: {id: id}, cascade: true});
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};

export default technologyService;
