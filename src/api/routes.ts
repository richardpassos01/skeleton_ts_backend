import * as Router from '@koa/router';

import {TYPES} from '@constants/types';
import container from '@dependencyInjectionContainer';
import authentication from '@middleware/authentication';
import schemaValidator from '@middleware/schemaValidator';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import AuthenticationController from './authentication/AuthenticationController';
import {
  createUserSchema,
  updatePasswordSchema,
} from './user/schemas/input/userSchemas';
import UserController from './user/UserController';

export const PREFIX_API = '/api/v1';

const router = new Router({
  prefix: PREFIX_API,
});

router.get('/healthy-check', ctx => {
  ctx.response.status = StatusCodes.OK;
  ctx.body = ReasonPhrases.OK;
});

router.post('/user/create', schemaValidator(createUserSchema), async ctx => {
  const userController = container.get<UserController>(TYPES.UserController);
  await userController.create(ctx);
  ctx.response.status = StatusCodes.CREATED;
  ctx.body = ReasonPhrases.CREATED;
});

router.patch(
  '/user/update-password',
  schemaValidator(updatePasswordSchema),
  authentication,
  async ctx => {
    const userController = container.get<UserController>(TYPES.UserController);
    await userController.updatePassword(ctx);
    ctx.response.status = StatusCodes.NO_CONTENT;
    ctx.body = ReasonPhrases.NO_CONTENT;
  }
);

router.post(
  '/authentication/authenticate',
  schemaValidator(updatePasswordSchema),
  async ctx => {
    const authenticationController = container.get<AuthenticationController>(
      TYPES.AuthenticationController
    );
    const result = await authenticationController.authenticate(ctx);
    ctx.response.status = StatusCodes.OK;
    ctx.body = result;
  }
);

export default router;
