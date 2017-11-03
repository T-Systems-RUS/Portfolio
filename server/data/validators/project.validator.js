const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


var  projectValidator={};

projectValidator.createValidators=function(){
    return [
        check('name','Field name is required').exists().isLength({ min: 1,max:100 }),
        check('line','Field line is required').exists().isLength({ min: 1,max:100 }),
        check('domain','Field domain is required').exists().isLength({ min: 1,max:100 }),
        check('startdate','Field startdate is required').exists().isLength({ min: 1,max:100 }),
        //check('enddate','Field startdate is required').isAfter()
    ]
}



module.exports = projectValidator;