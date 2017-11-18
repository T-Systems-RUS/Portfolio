'use strict';

const express = require('express');
const router = express.Router();

var multer = require('multer');
var DIR = 'images/';
var upload = multer({dest: DIR}).single('image');



// GET requests
router.post('/images/add', function (req, res, next) {
    var path = '';
    upload(req, res, function (err) {
       if (err) {
         // An error occurred when uploading
         console.log(err);
         return res.status(422).send("an Error occured")
       }  
      // No error occured.
      console.log(req.file)
       path = req.file.path;
       return res.send("Upload Completed for "+path); 
 });  
//console.log(req.file)   
})





module.exports = router;