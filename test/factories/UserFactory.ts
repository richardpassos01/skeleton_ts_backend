import {v4 as uuid} from 'uuid';
import User, {UserParams} from '../../src/domain/user/User';
import container from '../../src/DependencyInjectionContainer';
import UserRepository from '../../src/infrastructure/repositories/UserRepository';
import {TYPES} from '../../src/constants/types';
import AuthenticateUser from '../../src/application/use_cases/AuthenticateUser';

class UserFactory {
  user: User;

  constructor(
    public name = 'default user',
    public email = `${uuid()}@email.com`,
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
