export const Configuration = {
    development: {
      dialect: 'mysql',
      database: 'portfolio-dev',
      username: 'root',
      host: '127.0.0.1',
      port: 3306,
      password: '1Ass-4ole2',
      modelPaths: [`${__dirname}/../models`]
    }
};
