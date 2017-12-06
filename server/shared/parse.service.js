'use strict';

var  parseService={};



parseService.parseShedules=function(project,schedules){
    let parsed=[];
    if(Array.isArray(schedules)){
        for(let schedule of schedules){           
            let s=JSON.parse(schedule);

            parsed.push(
                {
                    projectid:project.id,
                    employeeid:s.employee.id,
                    roleid:s.role.id,
                    participation:s.participation,
                }
            )               
        }

    } else{
        if(schedules){
            let s=JSON.parse(schedules);
            parsed.push(
                {
                    projectid:project.id,
                    employeeid:s.employee.id,
                    roleid:s.role.id,
                    participation:s.participation,
                }
            )           
        }
    }

    return parsed;
}


parseService.parseTechnology=function(technologies){
    let parsed=[];
    if(Array.isArray(technologies)){
        for(let tech of technologies){           
            let t=JSON.parse(tech);

            parsed.push(
                {
                    id:t.id,
                    name:t.name,
                    domain:t.domain,
                    active:0,
                }
            )               
        }

    } else{
        if(technologies){
            let t=JSON.parse(technologies);
            parsed.push(
                {
                    id:t.id,
                    name:t.name,
                    domain:t.domain,
                    active:0,
                }
            )           
        }
    }

    return parsed;

}


module.exports = parseService;

 