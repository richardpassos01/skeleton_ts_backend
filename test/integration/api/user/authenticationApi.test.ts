import 'reflect-metadata';
import {TYPES} from '../../../../src/constants/types';
import container from '../../../../src/DependencyInjectionContainer';
import Database from '../../../../src/infrastructure/database';
import * as supertest from 'supertest';
import {StatusCodes} from 'http-status-codes';
import app, {PREFIX_API} from '../../../../src/api/app';
import UserFactory from '../../../factories/UserFactory';

const request = supertest(app.build());
let database: Database;

describe('authenticationApi', () => {
  beforeAll(async () => {
    database = container.get<Database>(TYPES.Database);
    await database.connection().migrate.latest();
  });

  afterAll(async () => {
    await database.connection().migrate.rollback();
    await database.connection().destroy();
  });

  describe('authenticateUser', () => {
    describe('When called the endpoint with correct email and password', () => {
      test('then authenticate user', async () => {
        const user = await new UserFactory().getAndSave();
        const response = await request
          .post(`${PREFIX_API}/authentication/authenticate`)
          .send({
            email: user.email,
            password: 'default pass',
          })
          .expect(StatusCodes.OK);

        expect(response.body.type).toEqual('bearer');
      });
    });

    describe('When called the endpoint with invalid password', () => {
      test('then throw unauthorized error', async () => {
        const user = await new UserFactory().getAndSave();

        await request
          .post(`${PREFIX_API}/authentication/authenticate`)
          .send({
            email: user.email,
            password: 'wrong_password',
          })
          .expect(StatusCodes.UNAUTHORIZED);
      });
    });

    describe('When called the endpoint with not found user', () => {
      test('then throw unprocessable entity error', async () => {
        await request
          .post(`${PREFIX_API}/authentication/authenticate`)
          .send({
            email: 'random@email',
            password: 'random_password',
          })
          .expect(StatusCodes.UNPROCESSABLE_ENTITY);
      });
    });
  });
});
