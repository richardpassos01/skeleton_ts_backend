import * as env from 'env-var';
import * as path from 'path';

const required = process.env.NODE_ENV !== 'test';

export default class Settings {
  static environment: string = env.get('NODE_ENV').default('local').asString();
  static port: number = env.get('PORT').required(required).asIntPositive();
  static accessTokenSecret: string = env
    .get('ACCESS_TOKEN_SECRET')
    .required(required)
    .asString();
  static timeToExpireAccessToken = `${env
    .get('ACCESS_TOKEN_EXPIRES_IN_HOURS')
    .default(24)
    .asIntPositive()}h`;
  static database = {
    client: 'sqlite3',
    connection: path.resolve('./data', `database-${this.environment}.sqlite`),
    migrations: {
      directory: './src/infrastructure/database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './src/infrastructure/database/seeds',
    },
    useNullAsDefault: true,
  };
}
