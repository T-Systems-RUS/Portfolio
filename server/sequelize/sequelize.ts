import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'portfolio-dev',
  username: 'root',
  host: 'localhost',
  password: '1Ass-4ole2',
  modelPaths: [`${__dirname}/models`]
});
