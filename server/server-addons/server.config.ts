import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as validator from 'express-validator';
import {ServerConstants} from './server.constants';

/**
 * express instanciates ones here
 * used for extended capabilities of express
 * 3rd party libraries configuerd globally here
 * @export
 * @const
 */

const app = express();

// set up max request size (extended for big requests with images)
app.use(bodyParser.json({limit: ServerConstants.MAX_REQUEST_SIZE}));
app.use(bodyParser.urlencoded({limit: ServerConstants.MAX_REQUEST_SIZE, extended: true}));
// point to build folder
app.use(express.static(path.resolve(__dirname, ServerConstants.DEFAULT_STATIC_PATH)));
// 3rd library for validation of POST/PUT REST requests
app.use(validator());

export default app;
