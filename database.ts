import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import config from './config';

let dialact: Dialect = process.env.DB_DIALECT as Dialect;

const sequelize = new Sequelize({
  ...config.getDatabaseConfig(),
  dialect: dialact ?? 'mysql',
  models: [__dirname + '/models'],
  logging: console.log
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });

export default sequelize;