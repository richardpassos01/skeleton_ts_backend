import {Request} from 'express';

import AuthenticateUser from '@application/use_cases/AuthenticateUser';
import {TYPES} from '@constants/types';
import Authentication from '@domain/authentication/Authentication';
import {inject, injectable} from 'inversify';

@injectable()
class AuthenticationController {
  constructor(
    @inject(TYPES.AuthenticateUser)
    private readonly authenticateUser: AuthenticateUser
  ) {}

  authenticate(request: Request): Promise<Authentication> {
    const {email, password} = request.body;
    return this.authenticateUser.execute(email, password);
  }
}

export default AuthenticationController;
