'use strict';

var models = require('../../models');


var  technologyService={};


//GET Section

//GET list of projects with teamcount
technologyService.getTechnologies= function(){
    try{
        return  models.Technology.findAll({
                        order: [
                            ['name', 'ASC'],
                        ]
                        // include: [{
                        //         as: 'schedules',
                        //         model: models.Schedule
                        //     },
                        // ]
                    }
                )
    }catch(e){
        console.log('fuck ',e)
    }
}



//GET single project by id



//GET check if project exists
technologyService.doesTechnologyExist= function(technology){
    
    return models.Technology.count({where: { name: technology.name, version:technology.version }}).then(count=>{
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

//POST create new technology
technologyService.createTechnology=function(Technology){
    return models.Technology.create({
        name: Technology.name,
        domain:Technology.domain,
        active:0,
        image:Technology.image,
        version:Technology.version || ""

      }).then(function (technology) {

         return technology;
      }).catch(error=>{
          throw new Error(error);
      })
}



technologyService.deleteTechnology=async  (id)=> {
    try{
        let technology= await models.Technology.findOne({ where: {id:id},include:[{as:'projects',model:models.Project}]});
        technology.removeProjects(technology.projects);
        let affectedRows=await models.Technology.destroy({ where: {id:id},cascade:true });

        return affectedRows;
    } catch(error){
        console.log(error)
        throw new Error(error);
    }
}


module.exports = technologyService;

 