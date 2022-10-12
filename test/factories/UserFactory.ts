import AuthenticateUser from '@application/use_cases/AuthenticateUser';
import {TYPES} from '@constants/types';
import container from '@dependencyInjectionContainer';
import User, {UserParams} from '@domain/user/User';
import UserRepository from '@infrastructure/repositories/UserRepository';
import * as crypto from 'crypto';

class UserFactory {
  user: User;

  constructor(
    public name = 'default user',
    public email = `${crypto.randomBytes(16).toString('hex')}@email.com`,
    public password = 'default pass'
  ) {
    this.user = new User({name, email} as UserParams);
    this.user.setPassword(password);
  }

  get() {
    return this.user;
  }

  async save() {
    const userRepository = container.get<UserRepository>(TYPES.UserRepository);
    return userRepository.create(this.user);
  }

  async authenticate() {
    const authenticateUser = container.get<AuthenticateUser>(
      TYPES.AuthenticateUser
    );
    return authenticateUser.execute(this.email, this.password);
  }

  async getAndSave() {
    await this.save();
    return this.get();
  }

  async saveAndAuthenticate() {
    await this.save();
    return this.authenticate();
  }
}

export default UserFactory;
