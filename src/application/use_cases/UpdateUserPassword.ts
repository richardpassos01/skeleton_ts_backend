import {inject, injectable} from 'inversify';
import FetchUserByEmail from '../../application/queries/FetchUserByEmail';
import {TYPES} from '../../constants/types';
import UserRepositoryInterface from '../../domain/user/repositories/UserRepositoryInterface';

@injectable()
class UpdateUserPassword {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepositoryInterface,

    @inject(TYPES.FetchUserByEmail)
    private readonly fetchUserByEmail: FetchUserByEmail
  ) {}

  async execute(email: string, password: string) {
    const user = await this.fetchUserByEmail.execute(email);
    user.setPassword(password);

    return this.userRepository.update(user);
  }
}

export default UpdateUserPassword;
