import * as express from 'express';
import {validationResult} from 'express-validator/check';
import projectService from './project.service';
import projectValidator from './project.validator';
import {Util} from '../../shared/Util';

const router = express.Router();

// GET requests
router.get('/projects', (req, res) =>
  projectService.getProjects()
    .then(Util.handleData(res)));

router.get('/projects/:id', (req, res) =>
  projectService.getProject(req.params.id)
    .then(Util.handleData(res)));

router.get('/projects/history/:name', (req, res) =>
  projectService.getProjectsByName(req.params.name)
    .then(Util.handleData(res)));

// POST Requests
router.post('/projects/create', projectValidator.createValidators(), (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.mapped()});
  }

  return projectService.doesProjectExist(req.body.name).then(doesExist => {
    if (doesExist) {
      res.status(409).json({errors: {latest: {msg: 'Project already exists or was archieved'}}});
    } else {
      projectService.createProject(req.body).then(Util.handleData(res));
    }
  });
});

router.post('/projects/update', projectValidator.createValidators(), (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.mapped()});
  }

  return projectService.isProjectLatest(req.body.id).then(isLatest => {
    if (!isLatest) {

      res.status(409).json({errors: {latest: {msg: 'Somebody has already updated the project in background'}}});
    } else {
      projectService.updateProject(req.body).then(Util.handleData(res));
    }
  });
});

// Put Requests
router.put('/projects/archieve', projectValidator.archieveValidators(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.mapped()});
  }

  projectService.isProjectLatest(req.body.id).then(isLatest => {
    if (isLatest) {
      projectService.archieveProject(req.body.id).then(Util.handleData(res));
    } else {
      res.status(409).json({errors: {latest: {msg: 'Somebody has already deleted the project in background'}}});
    }
  });
});

router.delete('/projects/delete/:name', projectValidator.deleteValidators(), async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.mapped()});
  }

  projectService.deleteProject(req.params.name)
    .then(() => res.status(200).json({message: 'ok'}));
});

module.exports = router;
