import * as jsonwebtoken from 'jsonwebtoken';
import Settings from '../../settings/Settings';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../constants/types';
import Authentication from '../../domain/authentication/Authentication';
import FetchUserByEmail from '../../application/queries/FetchUserByEmail';

@injectable()
class AuthenticateUser {
  constructor(
    @inject(TYPES.FetchUserByEmail)
    private readonly fetchUserByEmail: FetchUserByEmail
  ) {}

  async execute(email: string, password: string): Promise<Authentication> {
    const user = await this.fetchUserByEmail.execute(email);
    user.checkPassword(password);

    const accessToken = jsonwebtoken.sign(
      {name: user.name, id: user.id, email: user.email},
      Settings.accessTokenSecret,
      {
        expiresIn: Settings.timeToExpireAccessToken,
      }
    );

    return new Authentication(accessToken);
  }
}

export default AuthenticateUser;
