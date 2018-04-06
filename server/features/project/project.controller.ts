import * as express from 'express';
import projectService from './project.service';
import projectValidator from './project.validator';
import {Util} from '../../shared/Util';
import projectAddonsService from './shared/project-addons.service';

const router = express.Router();

// GET requests
router.get('/projects', (req, res) =>
  projectService.getProjects()
    .then(Util.handleData(res)));

router.get('/projects/addons', (req, res) =>
  projectAddonsService.getProjectFilterModel()
    .then(Util.handleData(res)));

router.get('/projects/:id', (req, res) =>
  projectService.getProject(req.params.id)
    .then(Util.handleData(res)));

router.get('/projects/history/:name', (req, res) =>
  projectService.getProjectsByName(req.params.name)
    .then(Util.handleData(res)));

// POST Requests
router.post('/projects/create', projectValidator.createValidators(), (req, res) =>
  Util.handleValidation(req, res, () =>
    projectService.doesProjectExist(req.body.name).then(doesExist =>
      doesExist ?
        Util.handleConflict(res, 'Project already exists or was archieved') :
        projectService.createProject(req.body)
          .then(Util.handleData(res)))
  ));

router.post('/projects/update', projectValidator.createValidators(), (req, res) =>
  Util.handleValidation(req, res, () =>
    projectService.isProjectLatest(req.body.id).then(isLatest =>
      !isLatest ?
        Util.handleConflict(res, 'Somebody has already updated the project in background') :
        projectService.updateProject(req.body)
          .then(Util.handleData(res)))
  ));

// Put Requests
router.put('/projects/archieve', projectValidator.archieveValidators(), (req, res) =>
  Util.handleValidation(req, res, () =>
    projectService.isProjectLatest(req.body.id).then(isLatest =>
      !isLatest ?
        Util.handleConflict(res, 'Somebody has already deleted the project in background') :
        projectService.archieveProject(req.body.id)
          .then(Util.handleData(res)))
  ));

router.delete('/projects/delete/:name', projectValidator.deleteValidators(), (req, res) =>
  Util.handleValidation(req, res, () =>
    projectService.deleteProject(req.params.name)
      .then(() => res.status(200).json({message: 'ok'}))
  ));

module.exports = router;
