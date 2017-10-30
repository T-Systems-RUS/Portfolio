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


//GET check if project exists
projectService.doesProjectExist= function(name){
    
    return models.Project.count({where: { name: name }}).then(count=>{
        if(count!=0){
            return true;
        } else{
            return false;
        }
    }).catch(error=>{
        console.log(error);
    }); 
}


//POST Section

//POST create new project
projectService.createProject=function(Project){
    return models.sequelize.transaction().then(function (t) {
        
        return models.Project.create({
            name: Project.name,
            line: Project.line,
            domain: Project.domain,
            description:Project.description,
            active:false,
            startdate:Project.startdate,
            enddate:Project.enddate,
            ishistory:false,              // default for new project
            version:1                     // default for new project
          }, {transaction: t}).then(function (project) {
            if(Project.technolodgyIds){
                models.Technology.findAll({
                    where:{
                        id:Project.technolodgyIds
                    }
                }).then(function(technologies){
                    if(technologies.length>0){
                        project.setTechnologies(technologies);
                    }  
        
                })
            }
                 
            return t.commit();
          }).catch(function (err) {
                console.log(err);
                return t.rollback();
          });
      });
}


//POST request update Project
projectService.updateProject=function(Project){
    
        
        
}



module.exports = projectService;

 