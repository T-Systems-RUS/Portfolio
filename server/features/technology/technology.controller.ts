import * as express from 'express';
import technologyService from './technology.service';
import technologyValidator from './technology.validator';
import {validationResult} from 'express-validator/check';

const router = express.Router();

// GET requests
router.get('/technologies', (req, res) => {

  technologyService.getTechnologies().then(data => {
    if (!data) {
      res.status(404).send('No technologies found');
    }

    res.status(200).send(data);
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.get('/technologies/exists/:name/:id?', (req, res) =>
  technologyService.doesTechnologyExist(req.params.name, req.params.id)
    .then(doesExist => {
      console.log(doesExist);
      res.status(200).send(doesExist);
    }).catch(err => {
    res.status(500).send(err);
  }));

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
      technologyService.createTechnology(req.body).then(technology => {
        res.status(200).send(technology);
      }).catch(error => {
        res.status(500).json({errors: {er: {msg: error.message}}});
      });
    }
  }).catch(error => {
    res.status(500).json({errors: {er: {msg: error.message}}});
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
      technologyService.updateTechnology(req.body).then(technology => {
        res.status(200).send(technology);
      }).catch(error => {
        res.status(500).json({errors: {er: {msg: error.message}}});
      });
    }
  }).catch(error => {
    res.status(500).json({errors: {er: {msg: error.message}}});
  });
});

router.delete('/technology/delete/:id', technologyValidator.deleteValidators(), async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.mapped()});
  }

  try {
    await technologyService.deleteTechnology(req.params.id);
    res.status(200).json({message: 'ok'});
  } catch (error) {
    res.status(500).json({errors: {er: {msg: error}}});
  }
});

module.exports = router;
