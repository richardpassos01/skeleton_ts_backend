import {v4 as uuid} from 'uuid';
import * as crypto from 'crypto';

export interface UserInterface {
  name: string;
  email: string;
  id: string;
  salt: string | null;
  hash: string | null;
}

class User implements UserInterface {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly id: string = uuid(),
    public salt: string | null = null,
    public hash: string | null = null
  ) {}

  setPassword(password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex');
  }

  checkPassword(password: string) {
    if (!this.salt) {
      throw new Error('Password not provided');
    }

    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex');

    return this.hash === hash;
  }
}

export default User;
