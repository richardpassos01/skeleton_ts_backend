import {NextFunction, Request, Response, Router} from 'express';

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

const router = Router();

router.get('/healthy-check', (_req: Request, response: Response) =>
  response.status(StatusCodes.OK).send(ReasonPhrases.OK)
);

router.post(
  '/user/create',
  schemaValidator(createUserSchema),
  (request: Request, response: Response, next: NextFunction) => {
    const userController = container.get<UserController>(TYPES.UserController);
    userController
      .create(request)
      .then(() =>
        response.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED)
      )
      .catch(next);
  }
);

router.patch(
  '/user/update-password',
  schemaValidator(updatePasswordSchema),
  authentication,
  (request: Request, response: Response, next: NextFunction) => {
    const userController = container.get<UserController>(TYPES.UserController);
    userController
      .updatePassword(request)
      .then(() =>
        response.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT)
      )
      .catch(next);
  }
);

router.post(
  '/authentication/authenticate',
  schemaValidator(updatePasswordSchema),
  (request: Request, response: Response, next: NextFunction) => {
    const authenticationController = container.get<AuthenticationController>(
      TYPES.AuthenticationController
    );
    authenticationController
      .authenticate(request)
      .then(result => response.status(StatusCodes.OK).send(result))
      .catch(next);
  }
);

export default router;
