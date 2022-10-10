import app, {PREFIX_API} from '@api/app';
import {TYPES} from '@constants/types';
import container from '@dependencyInjectionContainer';
import Database, {Tables} from '@infrastructure/database';
import {StatusCodes} from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import 'reflect-metadata';
import supertest from 'supertest';
import UserFactory from '../../factories/UserFactory';

const request = supertest(app.build());
let database: Database;
const token = 'abc';

describe('userAPI', () => {
  beforeAll(async () => {
    database = container.get<Database>(TYPES.Database);
    await database.connection().migrate.latest();

    jest.spyOn(jwt, 'verify').mockImplementation((...params) => {});
  });

  afterAll(async () => {
    await database.connection().migrate.rollback();
    await database.connection().destroy();

    jest.clearAllMocks();
  });

  describe('createUser', () => {
    describe('When called the endpoint with valid schema', () => {
      test('then create user', async () => {
        const user = await new UserFactory().get();

        await request
          .post(`${PREFIX_API}/user/create`)
          .send({
            name: user.name,
            email: user.email,
            password: 'myPass',
          })
          .expect(StatusCodes.CREATED);

        const [data] = await database
          .connection()
          .select('id')
          .where('email', user.email)
          .into(Tables.USERS);

        expect(!!data).toBeTruthy();
      });
    });

    describe('When called the endpoint with invalid schema', () => {
      test('then throw unprocessable entity error', async () => {
        await request
          .post(`${PREFIX_API}/user/create`)
          .send({
            name: 'richard',
            email: 'richard@email.com',
          })
          .expect(StatusCodes.UNPROCESSABLE_ENTITY);
      });
    });

    describe('When called the endpoint with already exists user', () => {
      test('then throw unprocessable entity error', async () => {
        const user = await new UserFactory().getAndSave();

        await request
          .post(`${PREFIX_API}/user/create`)
          .send({
            name: user.name,
            email: user.email,
            password: '123456',
          })
          .expect(StatusCodes.FORBIDDEN);
      });
    });
  });

  describe('updatePasword', () => {
    describe('When called the endpoint with valid user', () => {
      test('then update password', async () => {
        const user = await new UserFactory().getAndSave();

        await request
          .patch(`${PREFIX_API}/user/update-password`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            email: user.email,
            password: 'new_pass',
          })
          .expect(StatusCodes.NO_CONTENT);
      });
    });

    describe('When called the endpoint with not found user', () => {
      test('then throw not fund error', async () => {
        const user = await new UserFactory().get();

        await request
          .patch(`${PREFIX_API}/user/update-password`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            email: user.email,
            password: 'new_pass',
          })
          .expect(StatusCodes.NOT_FOUND);
      });
    });

    describe('When called the endpoint with invalid schema', () => {
      test('then throw unprocessable entity error', async () => {
        await request
          .patch(`${PREFIX_API}/user/update-password`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            email: 'richard@email.com',
          })
          .expect(StatusCodes.UNPROCESSABLE_ENTITY);
      });
    });
  });
});
