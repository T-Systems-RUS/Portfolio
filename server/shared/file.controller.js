
'use strict';
var path = require('path');
var fs = require('fs');
const DIST="server/images/";
const express = require('express');
const router = express.Router();
var multer = require('multer');
var projectService=require('../features/project/project.service');



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


router.get('/presentation/images/:id?', (req, res) => {

    projectService.getProject(req.params.id).then(project=>{
        if(!project) res.status(404).send("No projects found");
        
        let dist='../images/presentation';

        let header=fs.readFileSync(path.join(__dirname, dist , 'Header.png'));
        let header2=fs.readFileSync(path.join(__dirname, dist, 'Header2.png'));
        let domain=fs.existsSync(path.join(__dirname, dist, project.domain +'.png')) ?
            fs.readFileSync(path.join(__dirname, dist, project.domain +'.png')) :
            '';
        let image=project.image!=="null" ?  fs.readFileSync(path.join(__dirname, '../images', project.image))
                                            : null;
            
        let images={
          header:new Buffer(header,'binary').toString('base64'),
          header2:new Buffer(header2,'binary').toString('base64'),
          domain:new Buffer(domain,'binary').toString('base64'),
          image:image ? new Buffer(image,'binary').toString('base64') : ''
        };
    
        res.status(200).send(images);
    }).catch(err=>{
        res.status(500).send(err);
    })
});



module.exports = router;