import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as multer from 'multer';

import projectService from '../features/project/project.service';

const DIST = 'server/images/';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIST);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + req.body.name + path.extname(file.originalname));
  }
});

const upload = multer({storage: storage}).single('image');

// POST requests
router.post('/images/add', (req, res) => {
  upload(req, res, err => {
    if (err) {
      console.log(err)
      return res.status(422).send(err);
    }

    projectService.updateImage(req.body.id, req.file.filename).then(project => {
      res.status(200).send(project.image);
    }).catch(error => {
      res.status(500).json({errors: {er: {msg: error}}});
    });
  });
});

router.put('/images/remove', (req, res) => {
  const image = DIST + req.body.image;
  fs.exists(image, exists => {
    if (exists) {
      fs.unlink(image);
      req.body.image = null;
      projectService.removeImage(req.body).then(project => {
        res.status(200).send(project);
      }).catch(error => {
        res.status(500).json({errors: {er: {msg: error}}});
      });
    } else {
      console.log(exists);
      res.status(404).send('File not found.');
    }
  });
});

router.get('/presentation/images/:id?', (req, res) => {

  projectService.getProject(req.params.id).then(project => {
    if (!project) {
      res.status(404).send('No projects found');
    }

    const dist = '../images/presentation';

    const header = fs.readFileSync(path.join(__dirname, dist, 'Header.png'));
    const header2 = fs.readFileSync(path.join(__dirname, dist, 'Header2.png'));
    const domain = fs.existsSync(path.join(__dirname, dist, project.domain + '.png')) ?
      fs.readFileSync(path.join(__dirname, dist, project.domain + '.png')) : '';

    const image = fs.existsSync(path.join(__dirname, '../images', project.image || 'image.png')) ?
      fs.readFileSync(path.join(__dirname, '../images', project.image)) : '';

    const technologies = [];
    for (const technology of project.technologies) {
      if (fs.existsSync(path.join(__dirname, dist, technology.image || 'image.png'))) {
        const tech = fs.readFileSync(path.join(__dirname, dist, technology.image));
        technologies.push({
          domain: technology.domain,
          name: technology.name,
          image: new Buffer(tech, 'binary').toString('base64')
        });
      }
    }

    const images = {
      header: new Buffer(header, 'binary').toString('base64'),
      header2: new Buffer(header2, 'binary').toString('base64'),
      domain: new Buffer(domain, 'binary').toString('base64'),
      image: new Buffer(image, 'binary').toString('base64'),
      technologies: technologies
    };

    res.status(200).send(images);
  }).catch(err => {
    console.log(err);
    res.status(500).json({errors: {er: {msg: err}}});
  });
});

module.exports = router;
