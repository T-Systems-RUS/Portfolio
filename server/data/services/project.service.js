'use strict';

var models = require('../../models');


var  projectService={};


//GET Section

//GET list of projects with teamcount
projectService.getProjects=function(){
    return   models.Project.findAll({
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

module.exports = projectService;

 