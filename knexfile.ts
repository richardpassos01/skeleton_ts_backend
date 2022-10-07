import {database} from './src/config';

export default {
  client: database.client,
  connection: database.connection,
  migrations: {
    directory: `${__dirname}/src/infrastructure/database/migrations`,
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: `${__dirname}/src/infrastructure/database/seeds`,
  },
  useNullAsDefault: true,
};
