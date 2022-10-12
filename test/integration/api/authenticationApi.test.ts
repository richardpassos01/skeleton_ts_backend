import app from '@api/app';
import {PREFIX_API} from '@api/routes';
import {TYPES} from '@constants/types';
import container from '@dependencyInjectionContainer';
import UserFactory from '@factories/UserFactory';
import Database from '@infrastructure/database';
import {StatusCodes} from 'http-status-codes';
import 'reflect-metadata';
import * as supertest from 'supertest';

describe('authenticationApi', () => {
  const server = app.listen();
  const request = supertest(server);
  let database: Database;

  beforeAll(async () => {
    database = container.get<Database>(TYPES.Database);
    await database.connection().migrate.latest();
  });

  afterAll(async () => {
    await database.connection().migrate.rollback();
    await database.connection().destroy();
    server.close();
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
      test('then throw not found error', async () => {
        const user = await new UserFactory().get();

        await request
          .post(`${PREFIX_API}/authentication/authenticate`)
          .send({
            email: user.email,
            password: 'random_password',
          })
          .expect(StatusCodes.NOT_FOUND);
      });
    });

    describe('When called the endpoint without invalid input', () => {
      test('then throw unprocessable entity error', async () => {
        await request
          .post(`${PREFIX_API}/user/create`)
          .send({
            email: 'richard@email.com',
          })
          .expect(StatusCodes.UNPROCESSABLE_ENTITY);
      });
    });
  });
});
