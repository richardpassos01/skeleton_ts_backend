import {inject, injectable} from 'inversify';
import {TYPES} from '../../constants/types';
import UserRepositoryInterface from '../../domain/user/repositories/UserRepositoryInterface';
import User, {UserParams} from '../../domain/user/User';
import Database from '../../infrastructure/database';
import Tables from '../../infrastructure/database/Tables';

@injectable()
class UserRepository implements UserRepositoryInterface {
  constructor(
    @inject(TYPES.Database)
    private readonly database: Database
  ) {}

  async create(user: User) {
    await this.database.connection().insert(user).into(Tables.USERS);
  }

  async update(user: User) {
    await this.database
      .connection()
      .update(user)
      .where('id', user.id)
      .into(Tables.USERS);
  }

  async findByEmail(email: string) {
    return this.database
      .connection()
      .select('name', 'email', 'id', 'salt', 'hash')
      .where('email', email)
      .into(Tables.USERS)
      .first()
      .then((data: UserParams) => (data ? new User(data) : null));
  }
}

export default UserRepository;
