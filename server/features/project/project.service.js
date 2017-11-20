'use strict';

var models = require('../../models');


var  projectService={};


//GET Section

//GET list of projects with teamcount
projectService.getProjects= function(){
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
}



//GET single project by id
projectService.getProject = function(id){
    
    return models.Project.findOne({
        where: {
            id: id,
            ishistory:false
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
    
    return models.Project.count({where: { name: name}}).then(count=>{
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
        pss:Project.pss,
        program:Project.program,
        feedback:Project.feedback,
        image:Project.image,
        type:Project.type,
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
        
        if(Array.isArray(Project.schedules)){
            for(let schedule of Project.schedules){
                //console.log(schedule)
                    let s=JSON.parse(schedule);
                
                    models.Schedule.create({
                        projectid:project.id,
                        employeeid:s.employee.id,
                        roleid:s.role.id,
                        participation:s.participation,
                    });
            }
        } else{
            if(Project.schedules){
                let s=JSON.parse(Project.schedules);
                
                    models.Schedule.create({
                        projectid:project.id,
                        employeeid:s.employee.id,
                        roleid:s.role.id,
                        participation:s.participation,
                    });
            }
        }
        
        


         return project;
      }).catch(error=>{
          console.log(error);
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
          })  
    }).catch(error=>{
        console.log(error);
        return t.rollback();
    }) 
     
}


//PUT request archieve project
projectService.archieveProject=  async(id)=> {
    try{
        let project=await  models.Project.update(
                    { ishistory: true,
                      updatedAt:new Date()  },
                    { where: { id:id } }
                 );
        
        return project;
    } catch(e){
        console.log(e);
    }
}


//PUT Save image
projectService.updateImage=  (id,image)=> {
    return models.Project.update(
        { 
            image: image,
            updatedAt:new Date() 
        },
        { 
            where: { id:id }
        }     
     ).then(()=>{
        return projectService.getProject(id);
     });
}






module.exports = projectService;

 