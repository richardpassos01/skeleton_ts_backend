import * as Koa from 'koa';

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

  authenticate(ctx: Koa.DefaultContext): Promise<Authentication> {
    const {email, password} = ctx.request.body;
    return this.authenticateUser.execute(email, password);
  }
}

export default AuthenticationController;
