import {TYPES} from '@constants/types';
import ErrorCode from '@domain/shared/error/ErrorCode';
import {UserAlreadyExists} from '@domain/user/error/UserErrors';
import UserRepositoryInterface from '@domain/user/repositories/UserRepositoryInterface';
import User, {UserParams} from '@domain/user/User';
import {inject, injectable} from 'inversify';

@injectable()
class CreateUser {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute(name: string, email: string, password: string): Promise<void> {
    try {
      const user = new User({name, email} as UserParams);
      user.setPassword(password);
      await this.userRepository.create(user);
    } catch {
      throw new UserAlreadyExists();
    }
  }
}

export default CreateUser;
