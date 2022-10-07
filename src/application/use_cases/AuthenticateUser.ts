import * as jsonwebtoken from 'jsonwebtoken';
import {jwt} from '../../config';
import User from '../../domain/user/User';
import UserRepositoryInterface from '../../domain/user/repositories/UserRepositoryInterface';

class AuthenticateUser {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(email: string, password: string) {
    const data = await this.userRepository.findByEmail(email);

    if (!data.length) {
      throw new Error('User not found');
    }

    const [{name, id, salt, hash}] = data;

    const user = new User(name, email, id, salt, hash);
    const isValidPassword = user.checkPassword(password);

    if (!isValidPassword) {
      throw new Error('Invalid password or identifier');
    }

    const accessToken = jsonwebtoken.sign(
      {name, id, email},
      jwt.accessTokenSecret,
      {
        expiresIn: jwt.timeToExpireAccessToken,
      }
    );

    return {
      token_type: 'bearer',
      access_token: accessToken,
      access_token_expires_in: jwt.timeToExpireAccessToken,
    };
  }
}

export default AuthenticateUser;
