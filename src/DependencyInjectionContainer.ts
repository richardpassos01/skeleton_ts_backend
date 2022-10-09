import {Container} from 'inversify';

import UserRepositoryInterface from './domain/user/repositories/UserRepositoryInterface';

import Database from './infrastructure/database';

import UserController from './api/user/UserController';
import AuthenticationController from './api/authentication/AuthenticationController';

import CreateUser from './application/use_cases/CreateUser';
import AuthenticateUser from './application/use_cases/AuthenticateUser';
import UpdateUserPassword from './application/use_cases/UpdateUserPassword';

import UserRepository from './infrastructure/repositories/UserRepository';
import {TYPES} from './constants/types';
import FetchUserByEmail from './application/queries/FetchUserByEmail';

const container = new Container();

container
  .bind<UserRepositoryInterface>(TYPES.UserRepository)
  .to(UserRepository)
  .inSingletonScope();

container.bind<Database>(TYPES.Database).to(Database).inSingletonScope();

container.bind<CreateUser>(TYPES.CreateUser).to(CreateUser).inSingletonScope();

container
  .bind<AuthenticateUser>(TYPES.AuthenticateUser)
  .to(AuthenticateUser)
  .inSingletonScope();

container
  .bind<UpdateUserPassword>(TYPES.UpdateUserPassword)
  .to(UpdateUserPassword)
  .inSingletonScope();

container
  .bind<FetchUserByEmail>(TYPES.FetchUserByEmail)
  .to(FetchUserByEmail)
  .inSingletonScope();

container
  .bind<UserController>(TYPES.UserController)
  .to(UserController)
  .inSingletonScope();

container
  .bind<AuthenticationController>(TYPES.AuthenticationController)
  .to(AuthenticationController)
  .inSingletonScope();

export default container;
