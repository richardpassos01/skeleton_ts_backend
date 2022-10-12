import {TYPES} from '@constants/types';
import UserRepositoryInterface from '@domain/user/repositories/UserRepositoryInterface';
import User, {UserParams} from '@domain/user/User';
import Database, {Tables} from '@infrastructure/database';
import {inject, injectable} from 'inversify';

@injectable()
class UserRepository implements UserRepositoryInterface {
  constructor(
    @inject(TYPES.Database)
    private readonly database: Database
  ) {}

  async create(user: User) {
    const {id, ...data} = user;

    await this.database
      .connection()
      .collection(Tables.USERS)
      .insertOne({_id: id, ...data});
  }

  async update(user: User) {
    await this.database
      .connection()
      .collection(Tables.USERS)
      .updateOne({id: user.id}, {$set: user});
  }

  async findByEmail(email: string) {
    return this.database
      .connection()
      .collection(Tables.USERS)
      .findOne({email})
      .then(data => {
        if (!data) return null;
        const {_id, ...user} = data;
        return new User({id: _id, ...user} as UserParams);
      });
  }
}

export default UserRepository;
