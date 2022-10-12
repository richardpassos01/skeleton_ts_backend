import * as Koa from 'koa';

import CreateUser from '@application/use_cases/CreateUser';
import UpdateUserPassword from '@application/use_cases/UpdateUserPassword';
import {TYPES} from '@constants/types';
import {inject, injectable} from 'inversify';

@injectable()
class UserController {
  constructor(
    @inject(TYPES.CreateUser)
    private readonly createUser: CreateUser,

    @inject(TYPES.UpdateUserPassword)
    private readonly updateUserPassword: UpdateUserPassword
  ) {}

  create(ctx: Koa.DefaultContext): Promise<void> {
    const {name, email, password} = ctx.request.body;
    return this.createUser.execute(name, email, password);
  }

  updatePassword(ctx: Koa.DefaultContext): Promise<void> {
    const {email, password} = ctx.request.body;
    return this.updateUserPassword.execute(email, password);
  }
}

export default UserController;
