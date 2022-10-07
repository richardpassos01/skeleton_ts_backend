import {UserInterface} from '../User';

export default interface UserRepositoryInterface {
  create(user: UserInterface): Promise<void>;
  update(user: UserInterface): Promise<void>;
  findByEmail(email: string): Promise<UserInterface[]>;
}
