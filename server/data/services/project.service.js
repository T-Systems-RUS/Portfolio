'use strict';

var models = require('../../models');


var  projectService={};


//GET Section

//GET list of projects with teamcount
projectService.getProjects= function(){
    try{
        return  models.Project.findAll({
                        where: { ishistory: 0 },
                        distinct:'name',
                        include: [{
                                as: 'schedules',
                                model: models.Schedule
                            },
                        ],
                        order:[
                            ['updatedAt','DESC']
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


//Get All Projects with same name
projectService.getProjectsByName = function(name){
    
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
              },{
                as: 'role',
                model:models.Role
              }]
        },{
            as:'technologies',
            model: models.Technology
        }],
        order:[
            ['version','DESC']
        ]        
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


//GET Get latest project
projectService.isProjectLatest=function(id){
    return models.Project.findOne({
        where:{
            id:id
        }
    }).then(project=>{
        return project.ishistory ? false : true;
    }).catch(error=>{
        console.log(error);
    });
} 


//POST Section

//POST create new project
projectService.createProject=function(Project){
    return models.Project.create({
        name: Project.name,
        line: Project.line,
        customer:Project.customer,
        domain: Project.domain,
        description:Project.description,
        active:false,
        startdate:Project.startdate,
        enddate:Project.enddate,
        ishistory:false,              // default for new project
        version:Project.version                    // default for new project
      }).then(function (project) {
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

         return project;
      })
}


//POST request update Project
projectService.updateProject=function(Project){
    let transaction=models.sequelize.transaction();
    return transaction.then(function(t){
        return models.Project.update(
            { ishistory: true },
            { where: { id: Project.id } },
            { transaction: t }
          ).then(project=>{
                t.commit();
                return projectService.createProject(Project);   
          },error=>{
            console.log(error);
            return t.rollback();
        })  
    }) 
     
}






module.exports = projectService;

 