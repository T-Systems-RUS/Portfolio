const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator/check');

var technologyService=require('./technology.service');
var technologyValidator=require('./technology.validator');

// GET requests
router.get('/technologies', (req, res) => {
    
    technologyService.getTechnologies().then(data=>{
        if(!data) res.status(404).send("No technologies found");
        
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send(err);
    })
      
      
});


//POST Requests
router.post('/technology/create', technologyValidator.createValidators(),(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.mapped() });
    }
   
    return technologyService.doesTechnologyExist(req.body).then(doesExist=>{
        if(doesExist){
            res.status(409).json({ errors: { latest:{msg:'TEchnology already exists'} }});
        }else{
            technologyService.createTechnology(req.body).then(technology=>{
                res.status(200).send(technology);
            }).catch(error=>{
                 res.status(500).json({ errors: { er:{msg:error.message} }});
            })   
        }
     }).catch(error=>{
         res.status(500).json({ errors: { er:{msg:error.message} }});
     }) 
 })


 router.delete('/technology/delete/:id', technologyValidator.deleteValidators(), async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    
    try{
        let response= await technologyService.deleteTechnology(req.params.id);
        res.status(200).json({message:'ok'});
        
    } catch(error){
        console.log('from catch',response)
        res.status(500).json({ errors: { er:{msg:error} }});
    }
       
})



module.exports = router;