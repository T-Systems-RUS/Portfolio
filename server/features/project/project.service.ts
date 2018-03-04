import {Project} from '../../models/Project';
import {Scopes} from '../../sequelize/Scopes';
import {Technology} from '../../models/Technology';
import {Schedule} from '../../models/Schedule';
import {ProjectTechnology} from '../../models/ProjectTechnology';
import sequelize from '../../sequelize/sequelize';
import parse from '../../shared/parse.service';

const projectService = {

  getProjects: () => Project.scope([
    Scopes.WITH_TECHNOLOGIES,
    Scopes.WITH_SCHEDULES,
    Scopes.ACTUAL_PROJECTS
  ])
    .findAll({ order: [ ['updatedAt', 'DESC']]
  }),

  // GET single project by id
  getProject: id => Project.scope([
    Scopes.FULL,
    Scopes.ACTUAL_PROJECTS
  ])
    .findOne({
      where: {
        id: id
      }
  }),

  // Get All Projects with same name
  getProjectsByName: name => Project.scope([Scopes.FULL]).findAll({
    where: {
      name: name
    },
    order: [
      ['version', 'DESC']
    ]
  }),

// GET check if project exists
  doesProjectExist: name => Project.count({where: {name: name}})
    .then(count => count !== 0)
    .catch(error => {
      console.log(error);
    }),

// GET Get latest project
  isProjectLatest: id => Project.findOne({
    where: {
      id: id
    }
  }).then(project => !project.ishistory)
    .catch(error => {
      console.log(error);
    }),

  // POST create new project
  createProject: project => Project.create({
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
  })
    .then(projectNew => {
      const schedules = parse.parseShedules(projectNew, project.schedules);
      console.log(schedules);
      const instances = parse.parseTechnology(project.technologies);
      // // return project only after technologies added
      return Promise.all([
        Schedule.bulkCreate(schedules),
        projectNew.$set('technologies', instances)
      ]).then(() =>  projectNew);
    })
    .catch(error => {
      console.log(error);
      throw new Error(error);
    }),

// POST request update Project
  updateProject: project => sequelize.transaction()
    .then(t => Project.update(
      {ishistory: true},
      {where: {id: project.id}, transaction: t},
    )
      .then(() => projectService.createProject(project)
        .then(newProject => {
          t.commit();
          return newProject;
        })))
    .catch(error => {
      throw new Error(error);
    }),

  // PUT request archieve project
  archieveProject: async id => {
    try {
      return await Project.update(
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
        project.$remove('technologies', project.technologies);
        Schedule.destroy({where: {projectid: project.id}});
      });
      return await Project.destroy({where: {name: name}, cascade: true});
    } catch (error) {
      throw new Error(error);
    }
  },

  // PUT Save image
  updateImage: (id, image) => Project.update(
    {
      image: image,
      updatedAt: new Date()
    },
    {
      where: {id: id}
    }
  ).then(() => projectService.getProject(id)),

  removeImage: project => Project.update(
    {
      image: project.image
    },
    {
      where: {name: project.name}
    }
  ).then(() => projectService.getProject(project.id))
};

export default projectService;
