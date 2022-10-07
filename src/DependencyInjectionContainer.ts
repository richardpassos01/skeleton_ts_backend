import {Container} from 'inversify';

import UserRepositoryInterface from './domain/user/repositories/UserRepositoryInterface';

import Database from './infrastructure/database';

import UserController from './api/user/UserController';

import CreateUser from './application/use_cases/CreateUser';
import AuthenticateUser from './application/use_cases/AuthenticateUser';
import UpdateUserPassword from './application/use_cases/UpdateUserPassword';

import UserRepository from './infrastructure/repositories/UserRepository';

import Settings from './settings/Settings';
 
const container = new Container();

container
  .bind<UserRepositoryInterface>(Symbol.for('UserRepositoryInterface'))
  .to(UserRepository)
  .inSingletonScope();

const database = Database.getInstance();

const userRepository = new UserRepository(database);

const createUser = new CreateUser(userRepository);
const authenticateUser = new AuthenticateUser(userRepository);
const updateUserPassword = new UpdateUserPassword(userRepository);

const userController = new UserController(
  createUser,
  authenticateUser,
  updateUserPassword
);

export {database, userController, userRepository, authenticateUser};
export default container;
