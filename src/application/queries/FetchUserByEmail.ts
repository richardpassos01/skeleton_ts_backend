import {inject, injectable} from 'inversify';
import {TYPES} from '../../constants/types';
import {UserNotFound} from '../../domain/user/error/UserErrors';
import UserRepositoryInterface from '../../domain/user/repositories/UserRepositoryInterface';
import User from '../../domain/user/User';

@injectable()
class FetchUserByEmail {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}

export default FetchUserByEmail;
