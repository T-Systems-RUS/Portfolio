import {Sequelize} from 'sequelize-typescript';
import {Configuration} from './sequelize.config';

export const sequelize = new Sequelize(Configuration['development']);
