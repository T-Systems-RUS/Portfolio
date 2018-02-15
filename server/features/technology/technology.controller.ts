import * as express from 'express';
import technologyService from './technology.service';
import technologyValidator from './technology.validator';
import {validationResult} from 'express-validator/check';
import {Util} from '../../shared/Util';

const router = express.Router();

// GET requests
router.get('/technologies', (req, res) =>
  technologyService.getTechnologies()
    .then(Util.handleData(res)));

router.get('/technologies/exists/:name/:id?', (req, res) =>
  technologyService.doesTechnologyExist(req.params.name, req.params.id)
    .then(doesExist => res.status(200).send(doesExist)));

// POST Requests
router.post('/technology/create', technologyValidator.createValidators(), (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.mapped()});
  }

  return technologyService.doesTechnologyExist(req.body.name, req.body.id).then(doesExist => {
    if (doesExist) {
      res.status(409).json({errors: {latest: {msg: 'Technology already exists'}}});
    } else {
      technologyService.createTechnology(req.body).then(Util.handleData(res));
    }
  });
});

router.post('/technology/update', technologyValidator.createValidators(), (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.mapped()});
  }

  return technologyService.doesTechnologyExist(req.body.name, req.body.id).then(doesExist => {
    if (doesExist) {
      res.status(409).json({errors: {latest: {msg: 'Technology already exists'}}});
    } else {
      technologyService.updateTechnology(req.body).then(Util.handleData(res));
    }
  });
});

router.delete('/technology/delete/:id', technologyValidator.deleteValidators(), async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.mapped()});
  }

  technologyService.deleteTechnology(req.params.id)
    .then(() => res.status(200).json({message: 'ok'}));
});

module.exports = router;
