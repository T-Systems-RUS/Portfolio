import {Sequelize} from 'sequelize-typescript';
import {Configuration} from './sequelize.config';

// dynamic configuration depending on env
const env = process.env.NODE_ENV || 'development';

export const sequelize = new Sequelize(Configuration[env]);
