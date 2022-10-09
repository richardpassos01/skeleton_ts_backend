export const TYPES = {
  UserRepository: Symbol.for('UserRepositoryInterface'),
  UserController: Symbol.for('UserController'),
  AuthenticationController: Symbol.for('AuthenticationController'),
  CreateUser: Symbol.for('CreateUser'),
  FetchUserByEmail: Symbol.for('FetchUserByEmail'),
  AuthenticateUser: Symbol.for('AuthenticateUser'),
  UpdateUserPassword: Symbol.for('UpdateUserPassword'),
  Database: Symbol.for('Database'),
};
