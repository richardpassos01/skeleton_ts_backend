import UserRepositoryInterface from 'domain/user/repositories/UserRepositoryInterface';
import {UserInterface} from 'domain/user/User';
import Database from 'infrastructure/database';
import * as Config from '../../config';

class UserRepository implements UserRepositoryInterface {
  constructor(private readonly database: Database) {}

  async create(user: UserInterface) {
    await this.database
      .connection()
      .insert(user)
      .into(Config.database.tables.users);
  }

  async update(user: UserInterface) {
    await this.database
      .connection()
      .update(user)
      .where('id', user.id)
      .into(Config.database.tables.users);
  }

  async findByEmail(email: string) {
    return this.database
      .connection()
      .select('name', 'salt', 'hash', 'id')
      .where('email', email)
      .into(Config.database.tables.users);
  }
}

export default UserRepository;
