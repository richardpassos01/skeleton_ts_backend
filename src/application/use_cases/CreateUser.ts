import UserRepositoryInterface from 'domain/user/repositories/UserRepositoryInterface';
import User from '../../domain/user/User';

class CreateUser {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(name: string, email: string, password: string) {
    const user = new User(name, email);
    user.setPassword(password);

    return this.userRepository.create(user);
  }
}

export default CreateUser;
