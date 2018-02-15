import * as express from 'express';
import technologyService from './technology.service';
import technologyValidator from './technology.validator';
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
  Util.validateRequest(req, res);

  return technologyService.doesTechnologyExist(req.body.name, req.body.id).then(doesExist =>
    doesExist ?
      Util.handleConflict(res, 'Technology already exists') :
      technologyService.createTechnology(req.body)
        .then(Util.handleData(res)));
});

router.post('/technology/update', technologyValidator.createValidators(), (req, res) => {
  Util.validateRequest(req, res);

  return technologyService.doesTechnologyExist(req.body.name, req.body.id).then(doesExist =>
    doesExist ?
      Util.handleConflict(res, 'Technology already exists') :
      technologyService.updateTechnology(req.body)
        .then(Util.handleData(res)));
});

router.delete('/technology/delete/:id', technologyValidator.deleteValidators(), (req, res) => {
  Util.validateRequest(req, res);

  technologyService.deleteTechnology(req.params.id)
    .then(() => res.status(200).json({message: 'ok'}));
});

module.exports = router;
