import {Project} from '../../models/Project';
import {Scopes} from '../../sequelize/Scopes';
import {Schedule} from '../../models/Schedule';
import sequelize from '../../sequelize/sequelize';
import parse from '../../shared/parse.service';
import {ProjectCustomer} from '../../models/ProjectCustomer';
import Guid from '../../shared/Guid';

const projectService = {
  
  getProjects: () => sequelize.query('SELECT id from "Projects" as pr' +
    '  inner join (' +
    '      Select "uniqueId", max("updatedAt") as maxDate' +
    '      from "Projects"' +
    '      group by "uniqueId"' +
    '    ) as innerP' +
    '    on pr."uniqueId" = innerP."uniqueId"' +
    '    AND pr."updatedAt" = innerP.maxDate', { type: sequelize.QueryTypes.SELECT})
    .then(maxDateProjects => Project.scope([Scopes.PROJECT_LIST ])
      .findAll({
        where: {id: maxDateProjects.map(project => project.id)}
      })),

  // GET single project by id
  getProject: id => Project.scope([
    Scopes.FULL
  ])
    .findOne({
      where: {
        id: id
      }
  }),

  // Get All Projects with same name
  getProjectsByUniqueId: uniqueId => Project.scope([Scopes.FULL]).findAll({
    where: {
      uniqueId: uniqueId
    },
    order: [
      ['version', 'DESC']
    ]
  }),

// GET check if project exists
  doesProjectExist: uniqueId => Project.count({where: {uniqueId: uniqueId}})
    .then(count => count !== 0)
    .catch(error => {
      console.log(error);
    }),

  doesProjectWithNameExist: name => Project.count({where: {name: name }})
    .then(count => count !== 0)
    .catch(error => {
      console.log(error);
    }),

  doesProjectWithNameAndIdExist: (name, uniqueId) => Project.count({
      where: {
        name: name,
        uniqueId: {[sequelize.Op.ne]: uniqueId}
    }})
    .then(count => count !== 0)
    .catch(error => {
      console.log(error);
    }),

// GET Get latest project
  isProjectLatest: async (id, uniqueId) => {
    const maxDate = await Project.max('updatedAt', {where: {uniqueId}});
    const maxProject = await Project.findOne({
      where: {
        uniqueId,
        updatedAt: maxDate
      }
    });


    return maxProject.id === id;
  },


  // POST create new project
  createProject: project => Project.create({
    name: project.name,
    uniqueId: project.uniqueId || Guid.newGuid(),
    description: project.description,
    image: project.image,
    feedback: project.feedback,
    pss: project.pss,
    active: false,
    ishistory: false,
    version: project.version,
    programId: project.program.id,
    domainId: project.domain.id,
    typeId: project.type.id,
    startdate: project.startdate,
    enddate: project.enddate || null
  })
    .then(projectNew =>
      // return project only after technologies added
       Promise.all([
        Schedule.bulkCreate(parse.parseShedules(projectNew, project.schedules || [])),
        projectNew.$set('technologies', parse.parseTechnology(project.technologies || [])),
        projectNew.$set('customers', parse.parseCustomers(project.customers || []))
      ]).then(() =>  projectNew)
    )
    .catch(error => {
      throw new Error(error);
    }),

// POST request update Project
  updateProject: project => sequelize.transaction(transaction =>
    Project.update(
      { ishistory: true},
      { where: { id: project.id},  transaction }

    ).then( () => projectService.createProject(project))
      .then(newProject => {
        return newProject;
      }).catch(error => {
        transaction.rollback();
        throw new Error(error);
    })
  ),



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

  deleteProject: async id => {
    try {
      const project = await projectService.getProject(id);

      project.$remove('technologies', project.technologies);
      Schedule.destroy({where: {projectId: project.id}});
      ProjectCustomer.destroy({where: {projectId: project.id}});

      return await Project.destroy({where: {id}, cascade: true});
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
