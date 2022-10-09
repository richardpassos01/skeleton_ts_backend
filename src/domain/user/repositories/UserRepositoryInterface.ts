import User from '../User';

export default interface UserRepositoryInterface {
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
