import {check} from 'express-validator/check';

const technologyValidator = {
  createValidators: () => [
    check('name', 'Field name is required').exists().isLength({min: 1, max: 100}),
    check('domain', 'Field domain is required').exists().isLength({min: 1, max: 100})
  ],

  deleteValidators: () => [
    check('id', 'Technology id is required').exists().isLength({min: 1, max: 100000})
  ]
};

export default technologyValidator;
