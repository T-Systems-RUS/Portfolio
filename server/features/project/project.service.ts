var models = require('../../models');
var parse = require('../../shared/parse.service');

var projectService = {};

// GET Section

// GET list of projects with teamcount
projectService.getProjects = function () {
  return models.Project.findAll({
      where: {ishistory: 0},
      distinct: 'name',
      include: [{
        as: 'schedules',
        model: models.Schedule
      }, {
        as: 'technologies',
        model: models.Technology
      }
      ],
      order: [
        ['updatedAt', 'DESC']
      ]
    }
  );
};

// GET single project by id
projectService.getProject = function (id) {

  return models.Project.findOne({
    where: {
      id: id,
      ishistory: false
    },
    include: [{
      as: 'schedules',
      model: models.Schedule,
      include: [{
        as: 'employee',
        model: models.Employee
      }, {
        as: 'role',
        model: models.Role
      }]
    }, {
      as: 'technologies',
      model: models.Technology
    }]
  });
};

// Get All Projects with same name
projectService.getProjectsByName = function (name) {

  return models.Project.findAll({
    where: {
      name: name
    },
    include: [{
      as: 'schedules',
      model: models.Schedule,
      include: [{
        as: 'employee',
        model: models.Employee
      }, {
        as: 'role',
        model: models.Role
      }]
    }, {
      as: 'technologies',
      model: models.Technology
    }],
    order: [
      ['version', 'DESC']
    ]
  });
};

// GET check if project exists
projectService.doesProjectExist = function (name) {

  return models.Project.count({where: {name: name}}).then(count => {
    if (count != 0) {
      return true;
    } else {
      return false;
    }
  }).catch(error => {
    console.log(error);
  });
};

// GET Get latest project
projectService.isProjectLatest = function (id) {
  return models.Project.findOne({
    where: {
      id: id
    }
  }).then(project => {
    return project.ishistory ? false : true;
  }).catch(error => {
    console.log(error);
  });
};

// POST create new project
projectService.createProject = function (Project) {
  return models.Project.create({
    name: Project.name,
    line: Project.line,
    customer: Project.customer,
    domain: Project.domain,
    description: Project.description,
    active: false,
    startdate: Project.startdate,
    enddate: Project.enddate,
    pss: Project.pss,
    program: Project.program,
    feedback: Project.feedback,
    image: Project.image,
    type: Project.type,
    ishistory: false,              // default for new project
    version: Project.version,                    // default for new project,
    technologies: Project.technologies
  }).then(function (project) {

    const technologies = parse.parseTechnology(Project.technologies);
    const instances = technologies.map(tech => {
      return models.Technology.build(tech)
    });
    project.setTechnologies(instances);

    const schedules = parse.parseShedules(project, Project.schedules);
    models.Schedule.bulkCreate(schedules);

    return project;
  }).catch(error => {
    throw new Error(error);
  });
};

// POST request update Project
projectService.updateProject = function (Project) {
  return models.sequelize.transaction().then(function (t) {
    return models.Project.update(
      {ishistory: true},
      {where: {id: Project.id}, transaction: t},
    ).then(project => {
      return projectService.createProject(Project).then(project => {
        t.commit();
        return project;
      }).catch(error => {
        console.log(error);
        throw new Error(error);
        return t.rollback();
      })
    }).catch(error => {
      console.log(error);
      throw new Error(error);
      return t.rollback();
    });
  }).catch(error => {
    console.log(error);
    throw new Error(error);
  });

};

// PUT request archieve project
projectService.archieveProject = async id => {
  try {
    const project = await  models.Project.update(
      {
        ishistory: true,
        updatedAt: new Date()
      },
      {where: {id: id}}
    );

    return project;
  } catch (e) {
    console.log(e);
  }
}

projectService.deleteProject = async name => {
  try {
    const projects = await projectService.getProjectsByName(name);
    projects.forEach(project => {
      project.removeTechnologies(project.technologies);
      models.Schedule.destroy({where: {projectid: project.id}});
    });

    const affectedRows = await models.Project.destroy({where: {name: name}, cascade: true});
    return affectedRows;
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
};

// PUT Save image
projectService.updateImage = (id, image) => {
  return models.Project.update(
    {
      image: image,
      updatedAt: new Date()
    },
    {
      where: {id: id}
    }
  ).then(() => {
    return projectService.getProject(id);
  });
};

projectService.removeImage = project => {
  return models.Project.update(
    {
      image: project.image
    },
    {
      where: {name: project.name}
    }
  ).then(() => {
    return projectService.getProject(project.id);
  });
};

module.exports = projectService;
