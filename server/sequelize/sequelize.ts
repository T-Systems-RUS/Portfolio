import {Sequelize} from 'sequelize-typescript';
import * as config from '../config/config.json';

// dynamic configuration depending on env
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);
sequelize.addModels([`${__dirname}/../models`]);

export {sequelize};
