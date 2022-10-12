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
  static database = env.get('DATABASE').default('skeleton').asString();
  static databaseStringConnection = env
    .get('DATABASE_STRING_CONNECTION')
    .default('mongodb://localhost:27017')
    .asString();
}
