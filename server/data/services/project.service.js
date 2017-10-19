'use strict';

var models = require('../../models');


var  projectService={};


//GET Section

//GET list of projects with teamcount
projectService.getProjects= function(){
    return  models.Project.findAll({
            include: [{
                as: 'schedules',
                model: models.Schedule,
                // include: [{
                //     as: 'employee',
                //     model: models.Employee
                //   }
                // ]
              } 
            ]
        }
    )
}

//GET single project by id
projectService.getProject = function(id){
    return models.Project.findAll({
        where: {
            id: id
          },
        include: [{
            as: 'schedules',
            model: models.Schedule,
            include: [{
                as: 'employee',
                model: models.Employee
              },{
                as: 'role',
                model:models.Role
              }]
        },{
            as:'technologies',
            model: models.Technology
        }]        
    })
}

module.exports = projectService;

 