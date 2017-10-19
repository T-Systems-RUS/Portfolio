const express = require('express');
const router = express.Router();

var projectService=require('../data/services/project.service');



router.get('/projects', (req, res) => {
    
    projectService.getProjects().then(data=>{
        if(!data) res.status(404).send("No projects found");
        
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send(err);
    })
      
      
});

router.get('/projects/:id', (req, res) => {
    console.log(req.params.id)
    projectService.getProject(req.params.id).then(data=>{
        if(!data) res.status(404).send("No projects found");
        
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send(err);
    })
      
      
});


module.exports = router;