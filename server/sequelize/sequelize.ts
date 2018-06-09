import {Sequelize} from 'sequelize-typescript';
import * as config from '../config/config.json';

// dynamic configuration depending on env
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);
sequelize.addModels([`${__dirname}/../models`]);

// Convert decimals from String to Number right away - mainly for PSS in number instead of string
Sequelize.postgres.DECIMAL.parse = value => parseFloat(value);

export default sequelize;
