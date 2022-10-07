import UserRepositoryInterface from 'domain/user/repositories/UserRepositoryInterface';
import User from '../../domain/user/User';

class UpdateUserPassword {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(email: string, password: string) {
    const data = await this.userRepository.findByEmail(email);

    if (!data.length) {
      throw new Error('User not found');
    }
    const [{name, id}] = data;

    const user = new User(name, email, id);

    user.setPassword(password);

    return this.userRepository.update(user);
  }
}

export default UpdateUserPassword;
