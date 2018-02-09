import * as models from '../../models/index';
import * as Sequelize from 'sequelize';

const op = Sequelize.Op;

const technologyService = {
  // GET Section
  // GET list of projects with teamcount
  getTechnologies: function () {
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
  doesTechnologyExist: function (name, id) {
    id = id || '';
    return models.Technology.count({where: {name: name, id: {[op.ne]: id}}}).then(count => {
      if (count != 0) {
        return true;
      } else {
        return false;
      }
    }).catch(error => {
      console.log(error);
    });
  },
  // POST Section

  // POST create new technology
  createTechnology: function (Technology) {
    return models.Technology.create({
      name: Technology.name,
      domain: Technology.domain,
      active: 0,
      image: Technology.image,
      version: Technology.version || ''

    }).then(function (technology) {

      return technology;
    }).catch(error => {
      throw new Error(error);
    });
  },

// PUT Update technology
  updateTechnology: function (Technology) {
    return models.Technology.update({
        name: Technology.name,
        domain: Technology.domain,
        active: 0,
        image: Technology.image,
        version: Technology.version || ''
      }, {where: {id: Technology.id}}
    ).then(function (technology) {
      return technology;
    }).catch(error => {
      throw new Error(error);
    });
  },

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
