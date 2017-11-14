const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


var  projectValidator={};

projectValidator.createValidators=function(){
    return [
        check('name','Field name is required').exists().isLength({ min: 1,max:100 }),
        check('line','Field line is required').exists().isLength({ min: 1,max:100 }),
        check('domain','Field domain is required').exists().isLength({ min: 1,max:100 }),
        check('type','Field type is required').exists().isLength({ min: 1,max:100 }),
        check('program','Field program is required').exists().isLength({ min: 1,max:100 }),
        check('startdate','Field startdate is required').exists().isLength({ min: 1,max:100 }),
        //check('enddate','Field startdate is required').isAfter()
    ]
}

projectValidator.archieveValidators=function(){
    return [
        check('id','Id is required').exists().isLength({ min: 1,max:100000 }),
        check('id','Id has to be number').isNumeric()
    ]
}



module.exports = projectValidator;