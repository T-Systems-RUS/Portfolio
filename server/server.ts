// Get dependencies
import * as express from 'express';

const path = require('path');
//const https = require('https');
const http = require('http');
const bodyParser = require('body-parser');
const validator = require('express-validator');

const projectController = require('./features/project/project.controller');
const technologyController = require('./features/technology/technology.controller');
const employeeController = require('./features/employee/employee.controller');
const fileController = require('./shared/file.controller');

const app = express();

// var sslOptions = {
//   key: fs.readFileSync('encryption/key.pem'),
//   cert: fs.readFileSync('encryption/cert.pem'),
//   passphrase: '1Ass-4ole2'
// };

// Parsers for POST data
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(validator());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/server/images', express.static('server/images'));


// Set our api routes
app.use('/api', projectController);
app.use('/api', technologyController);
app.use('/api', employeeController);
app.use('/api', fileController);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
//const server = https.createServer(sslOptions,app);
const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
