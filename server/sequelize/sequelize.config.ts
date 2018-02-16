export const Configuration = {
    development: {
      dialect: 'mysql',
      database: 'portfolio-dev',
      username: 'root',
      host: '127.0.0.1',
      port: 3306,
      password: '1Ass-4ole2',
      modelPaths: [`${__dirname}/../models`]
    },
    test: {
      username: 'root',
      password: null,
      database: 'database_test',
      host: '127.0.0.1',
      dialect: 'mysql',
      modelPaths: [`${__dirname}/../models`]
    },
    production: {
      username: 'portfolio-prod',
      password: 'DFS34rRGFE4gf',
      database: 'database_production',
      host: '127.0.0.1',
      dialect: 'mysql',
      modelPaths: [`${__dirname}/../models`]
    }
};
