const express = require('express');
const router = express.Router();

var projectService=require('../data/services/project.service');


// GET requests
router.get('/projects', (req, res) => {
    
    projectService.getProjects().then(data=>{
        if(!data) res.status(404).send("No projects found");
        
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send(err);
    })
      
      
});

router.get('/projects/:id', (req, res) => {
    projectService.getProject(req.params.id).then(data=>{
        if(!data) res.status(404).send("No projects found");
        
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send(err);
    })
      
      
});


//POST Requests
router.post('/projects/create',(req, res) => {
   return projectService.doesProjectExist(req.body.name).then(doesExist=>{
       console.log(doesExist)
       if(doesExist){
           res.status(409).send('Project already exists');
       }else{
           this,projectService.createProject(req.body).then(project=>{
               res.status(200).send(project);
           }).catch(error=>{
               res.status(500).send(error);
           })
       }
   })
      
      
})


module.exports = router;