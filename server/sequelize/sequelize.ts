import {Sequelize} from 'sequelize-typescript';
const config = require('./../config/config.json');

// dynamic configuration depending on env
const env = process.env.NODE_ENV || 'test';
const sequelize = new Sequelize(config[env]);
sequelize.addModels([`${__dirname}/../models`]);

export default sequelize;
