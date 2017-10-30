const express = require('express');
const router = express.Router();

const { validationResult } = require('express-validator/check');


var projectService=require('../data/services/project.service');
var projectValidator=require('../data/validators/project.validator');


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
router.post('/projects/create', projectValidator.createValidators(),(req, res) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(422).json({ errors: errors.mapped() });
   }

   return projectService.doesProjectExist(req.body.name).then(doesExist=>{
       if(doesExist){
           res.status(409).send('Project already exists');
       }else{
           this,projectService.createProject(req.body).then(project=>{
               res.status(200).send(project);
           },error=>{
                res.status(500).send(error);
           })   
       }
   })
      
      
})


module.exports = router;