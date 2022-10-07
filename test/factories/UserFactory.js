const {v4: uuid} = require('uuid');
const User = require('../../src/domain/user/User');
const {
  userRepository,
  authenticateUser,
} = require('../../src/DependencyInjectionContainer');

class UserFactory {
  constructor(
    name = 'default user',
    email = `${uuid()}@email.com`,
    password = 'default pass'
  ) {
    this.user = new User(name, email);
    this.user.setPassword(password);
  }

  get() {
    return this.user;
  }

  async save() {
    return userRepository.create(this.user);
  }

  async authenticate() {
    return authenticateUser.execute(this.user.email, 'default pass');
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
