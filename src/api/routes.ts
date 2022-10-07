import {Router} from 'express';
import {StatusCodes, ReasonPhrases} from 'http-status-codes';
import schemaValidator from '../middleware/schemaValidator';
import authentication from '../middleware/authentication';

import {
  createUserSchema,
  authenticateUserSchema,
  updatePasswordSchema,
} from './user/schema/input/userSchemas';

import {userController} from '../DependencyInjectionContainer';

const router = Router();

router.get('/healthy-check', (_, Response) =>
  Response.status(StatusCodes.OK).send(ReasonPhrases.OK)
);
router.post('/user', schemaValidator.body(createUserSchema), (...args) =>
  userController.create(...args)
);
router.post(
  '/user/authenticate',
  schemaValidator.body(authenticateUserSchema),
  (...args) => userController.authenticate(...args)
);
router.patch(
  '/user/update-password',
  authentication,
  schemaValidator.body(updatePasswordSchema),
  (...args) => userController.updatePassword(...args)
);

export default router;
