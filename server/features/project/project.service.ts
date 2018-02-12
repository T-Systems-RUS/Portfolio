import * as models from '../../models/index';
import parse from '../../shared/parse.service';

const projectService = {
  // GET list of projects with teamcount
  getProjects: () => models.Project.findAll({
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
  ),

  // GET single project by id
  getProject: id => models.Project.findOne({
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
  }),

  // Get All Projects with same name
  getProjectsByName: name => models.Project.findAll({
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
  }),

// GET check if project exists
  doesProjectExist: name => models.Project.count({where: {name: name}})
    .then(count => count !== 0)
    .catch(error => {
      console.log(error);
    }),

// GET Get latest project
  isProjectLatest: id => models.Project.findOne({
    where: {
      id: id
    }
  }).then(project => !project.ishistory)
    .catch(error => {
      console.log(error);
    }),

  // POST create new project
  createProject: project => models.Project.create({
    name: project.name,
    line: project.line,
    customer: project.customer,
    domain: project.domain,
    description: project.description,
    active: false,
    startdate: project.startdate,
    enddate: project.enddate,
    pss: project.pss,
    program: project.program,
    feedback: project.feedback,
    image: project.image,
    type: project.type,
    ishistory: false,              // default for new project
    version: project.version,                    // default for new project,
    technologies: project.technologies
  })
    .then(projectNew => {

      const technologies = parse.parseTechnology(projectNew.technologies);
      const instances = technologies.map(tech => models.Technology.build(tech));
      projectNew.setTechnologies(instances);

      const schedules = parse.parseShedules(projectNew, projectNew.schedules);
      models.Schedule.bulkCreate(schedules);

      return projectNew;
    })
    .catch(error => {
      throw new Error(error);
    }),

// POST request update Project
  updateProject: project => models.sequelize.transaction()
    .then(t => models.Project.update(
      {ishistory: true},
      {where: {id: project.id}, transaction: t},
    )
      .then(() => projectService.createProject(project)
        .then(newProject => {
          t.commit();
          return newProject;
        })))
    .catch(error => {
      console.log(error);
      throw new Error(error);
    }),

  // PUT request archieve project
  archieveProject: async id => {
    try {
      return await models.Project.update(
        {
          ishistory: true,
          updatedAt: new Date()
        },
        {where: {id: id}}
      );
    } catch (e) {
      console.log(e);
    }
  },

  deleteProject: async name => {
    try {
      const projects = await projectService.getProjectsByName(name);
      projects.forEach(project => {
        project.removeTechnologies(project.technologies);
        models.Schedule.destroy({where: {projectid: project.id}});
      });
      return await models.Project.destroy({where: {name: name}, cascade: true});
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  // PUT Save image
  updateImage: (id, image) => models.Project.update(
    {
      image: image,
      updatedAt: new Date()
    },
    {
      where: {id: id}
    }
  ).then(() => projectService.getProject(id)),

  removeImage: project => models.Project.update(
    {
      image: project.image
    },
    {
      where: {name: project.name}
    }
  ).then(() => projectService.getProject(project.id))
};

export default projectService;
