import * as crypto from 'crypto';
import {ObjectId} from 'mongodb';
import {InvalidPassword} from './error/UserErrors';

export interface UserParams {
  name: string | undefined;
  email: string | undefined;
  id: ObjectId;
  salt: string | undefined;
  hash: string | undefined;
}

class User {
  public id: ObjectId = new ObjectId();
  public name: string | undefined;
  public email: string | undefined;
  public salt: string = crypto.randomBytes(16).toString('hex');
  public hash: string | undefined;

  constructor(params: UserParams) {
    Object.assign(this, params);
  }

  setPassword(password: string): void {
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex');
  }

  checkPassword(password: string): void {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex');

    if (this.hash !== hash) throw new InvalidPassword();
  }
}

export default User;
