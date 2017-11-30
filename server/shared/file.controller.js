
'use strict';
var path = require('path');
var fs = require('fs');
const DIST="server/images/";
const express = require('express');
const router = express.Router();
var multer = require('multer');
var projectService=require('../features/project/project.service');
var pptx = require('pptxgenjs');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIST)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + req.body.name+path.extname(file.originalname));
  }
})

var upload = multer({ storage: storage }).single('image');
var pptx = require("pptxgenjs");

// POST requests
router.post('/images/add', function (req, res, next) {
    upload(req, res, function (err) {
       if (err) {
         console.log(err)
         return res.status(422).send(err)
       }  

       

       projectService.updateImage(req.body.id,req.file.filename).then(project=>{
          res.status(200).send(project.image);
       }).catch(error=>{
          res.status(500).json({ errors: { er:{msg:error} }});
       })
 });   
})


router.put('/images/remove', function (req, res, next) {
  let image=DIST+req.body.image;
  fs.exists(image, function(exists) {
    if(exists) {
      console.log(exists)
      fs.unlink(image);
      req.body.image=null;
      projectService.removeImage(req.body).then(project=>{
          res.status(200).send(project);
      }).catch(error=>{
          res.status(500).json({ errors: { er:{msg:error} }});
      })
    } else {
      console.log(exists)
      res.status(404).send('File not found.');
    }
  });
})


router.get('/presentation/images/:image?', (req, res) => {

    let background=fs.readFileSync(path.join(__dirname, '../images/presentation', 't-background.png'));
    let logo=fs.readFileSync(path.join(__dirname, '../images/presentation', 'logo.png'));
    let image=req.params.image!=="null" ?  fs.readFileSync(path.join(__dirname, '../images', req.params.image))
                                        : null;

                              
    let images={
      background:new Buffer(background,'binary').toString('base64'),
      logo:new Buffer(logo,'binary').toString('base64'),
      image:image ? new Buffer(image,'binary').toString('base64') : ''
    };

    res.status(200).send(images)
});



module.exports = router;