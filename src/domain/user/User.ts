import * as crypto from 'crypto';
import {v4 as uuid} from 'uuid';
import {InvalidCredentials} from './error/UserErrors';

export interface UserParams {
  name: string | undefined;
  email: string | undefined;
  id: string;
  salt: string | undefined;
  hash: string | undefined;
}

class User {
  public id: string = uuid();
  public name: string | undefined;
  public email: string | undefined;
  public salt: string | undefined;
  public hash: string | undefined;

  constructor(params: UserParams) {
    Object.assign(this, params);
  }

  setPassword(password: string): void {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex');
  }

  checkPassword(password: string): void {
    if (!this.salt) {
      throw new Error('Password not provided');
    }

    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex');

    if (this.hash !== hash) throw new InvalidCredentials();
  }
}

export default User;
