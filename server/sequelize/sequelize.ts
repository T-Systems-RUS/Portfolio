import {Sequelize} from 'sequelize-typescript';
const config = require('./../config/config.json');

// dynamic configuration depending on env
const env = process.env.NODE_ENV; // || 'development';
export const sequelize = new Sequelize(config[env]).addModels([`${__dirname}/../models`]);
