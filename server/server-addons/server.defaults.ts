import * as path from 'path';
import {ServerConstants} from './server.constants';

/**
 * Used to set up global server handlers
 * @export
 * @const
 */

const ServerDefaults = {
    setGlobalRouteHandler: app => {
        // Catch all other routes and return the index file
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, ServerConstants.DEFAULT_INDEX_PATH));
        });
    },

    setGlobalErrorHandling: app => {
        app.use((err, req, res, next) => {
            console.error(err);
            // Send in this format always, if there's a message - send message
            res.status(500).json({errors: {er: {msg: err.message ? err.message : err}}});
        });
    },

    port: process.env.PORT || ServerConstants.DEFAULT_PORT,

    setPort: app => {
        app.set(ServerConstants.PORT_ALIAS, this.port);
    }
};

export {ServerDefaults};
