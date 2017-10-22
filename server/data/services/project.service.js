'use strict';

var models = require('../../models');


var  projectService={};


//GET Section

//GET list of projects with teamcount
projectService.getProjects= function(){
    try{
        return  models.Project.findAll({
                        where: { ishistory: 0 },
                        include: [{
                                as: 'schedules',
                                model: models.Schedule
                            },
                        ]
                    }
                )
    }catch(e){
        console.log('fuck ',e)
    }
}

//GET list of projects with teamcount
// projectService.getProjects= function(){
//     return models.sequelize.query("SELECT * "+
//     "FROM ( "+
//           "SELECT name, MAX(id) as maxid "+
//           "FROM `portfolio-dev`.projects "+
//           "GROUP BY name "+
//     ") as Project "+
//     "INNER JOIN `portfolio-dev`.projects t "+
//     "ON t.name = Project.name AND t.id = Project.maxid "+
//     "left outer join `portfolio-dev`.schedules as schedules "+
//     "on t.id=schedules.projectid",{
        
//         type: models.sequelize.QueryTypes.SELECT
//       })  
    
// }




//GET single project by id
projectService.getProject = function(id){
    return models.Project.findOne({
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

 