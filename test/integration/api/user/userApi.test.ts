import 'reflect-metadata';
import {TYPES} from '../../../../src/constants/types';
import container from '../../../../src/DependencyInjectionContainer';
import Database from '../../../../src/infrastructure/database';
import * as supertest from 'supertest';
import {StatusCodes} from 'http-status-codes';
import app, {PREFIX_API} from '../../../../src/api/app';
import Tables from '../../../../src/infrastructure/database/Tables';

const request = supertest(app.build());
let database: Database;

describe('userAPI', () => {
  beforeAll(async () => {
    database = container.get<Database>(TYPES.Database);
    await database.connection().migrate.latest();
  });

  afterAll(async () => {
    await database.connection().migrate.rollback();
    await database.connection().destroy();
  });

  describe('createUser', () => {
    describe('When called the endpoint with name, email and password', () => {
      test('then create user', async () => {
        await request
          .post(`${PREFIX_API}/user/create`)
          .send({
            name: 'user',
            email: 'user@email.com',
            password: 'myPass',
          })
          .expect(StatusCodes.CREATED);

        const [data] = await database
          .connection()
          .select('id')
          .where('email', 'user@email.com')
          .into(Tables.USERS);

        expect(!!data).toBeTruthy();
      });
    });

    describe('When called the endpoint without name, email or password', () => {
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
  });
});
