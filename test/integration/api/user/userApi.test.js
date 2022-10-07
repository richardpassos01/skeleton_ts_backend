const supertest = require('supertest');
const {StatusCodes} = require('http-status-codes');
const {database} = require('../../../../src/DependencyInjectionContainer');
const app = require('../../../../src/api/app');
const server = require('../../../../src/api/server');
const UserFactory = require('../../../factories/UserFactory');

const request = supertest(app);
const {
  database: {tables},
} = require('../../../../src/config');

describe('userAPI', () => {
  beforeAll(async () => {
    await database.connection().migrate.latest();
  });

  afterAll(async () => {
    await database.connection().migrate.rollback();
    await database.connection().destroy();
    server.close();
  });

  describe('createUser', () => {
    describe('When called the endpoint with name, email and password', () => {
      test('then create user', async () => {
        request
          .post('/skeleton/user')
          .send({
            name: 'user',
            email: 'user@email.com',
            password: 'myPass',
          })
          .expect(StatusCodes.CREATED)
          .end(async err => {
            const [data] = await database
              .connection()
              .select('id')
              .where('email', 'user@email.com')
              .into(tables.users);

            expect(!!data.id).toBeTruthy();
          });
      });
    });

    describe('When called the endpoint without name, email or password', () => {
      test('then throw bad request error', async () => {
        request
          .post('/skeleton/user')
          .send({
            name: 'richard',
            email: 'richard@email.com',
          })
          .expect(StatusCodes.BAD_REQUEST);
      });
    });
  });

  describe('authenticateUser', () => {
    describe('When called the endpoint with correct email and password', () => {
      test('then authenticate user', async () => {
        const user = await new UserFactory().getAndSave();

        request
          .post('/skeleton/user/authenticate')
          .send({
            email: user.email,
            password: 'default pass',
          })
          .expect(StatusCodes.OK)
          .end(async (err, res) => {
            const {access_token: accessToken} = res.body;
            expect(!!accessToken).toBeTruthy();
          });
      });
    });

    describe('When called the endpoint with invalid password', () => {
      test('then throw bad request error', async () => {
        const user = await new UserFactory().getAndSave();

        request
          .post('/skeleton/user')
          .send({
            email: user.email,
            password: 'wrong_password',
          })
          .expect(StatusCodes.BAD_REQUEST);
      });
    });

    describe('When called the endpoint with not found user', () => {
      test('then throw bad request error', async () => {
        request
          .post('/skeleton/user')
          .send({
            email: 'random@email',
            password: 'random_password',
          })
          .expect(StatusCodes.BAD_REQUEST);
      });
    });
  });
});
