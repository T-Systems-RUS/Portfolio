'use strict';

var models = require('../../models');


var  employeeService={};


//GET Section

//GET list of projects with teamcount
employeeService.getEmployees= function(){
    try{
        return  models.Employee.findAll({
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

employeeService.getRoles= async ()=>{
    try{
        return await  models.Role.findAll({
            order:[
                ['name','ASC']
            ] 
        })
    }catch(e){
        console.log('fuck ',e)
    }
}








//POST Section

//POST create new project





module.exports = employeeService;

 