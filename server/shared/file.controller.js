'use strict';
var path = require('path');
const express = require('express');
const router = express.Router();
var multer = require('multer');
var projectService=require('../features/project/project.service');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/images/')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.fieldname + '-' + req.body.name+path.extname(file.originalname));
  }
})

var upload = multer({ storage: storage }).single('image');


// POST requests
router.post('/images/add', function (req, res, next) {
    upload(req, res, function (err) {
       if (err) {
         console.log(err)
         return res.status(422).send(err)
       }  

       
       console.log(req.file);
       projectService.updateImage(req.body.id,req.file.filename).then(project=>{
          res.status(200).send(project);
       }).catch(error=>{
          res.status(500).json({ errors: { er:{msg:error} }});
       })
 });  
//console.log(req.file)   
})





module.exports = router;