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
technologyService.doesTechnologyExist= function(name){
    
    return models.Technology.count({where: { name: name }}).then(count=>{
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





module.exports = technologyService;

 