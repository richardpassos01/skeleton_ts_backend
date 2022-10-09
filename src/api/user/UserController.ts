import AuthenticateUser from '../../application/use_cases/AuthenticateUser';
import CreateUser from '../../application/use_cases/CreateUser';
import UpdateUserPassword from '../../application/use_cases/UpdateUserPassword';
import {TYPES} from '../../constants/types';
import {Request, Response, NextFunction} from 'express';
import {StatusCodes, ReasonPhrases} from 'http-status-codes';
import {
  controller,
  httpPatch,
  httpPost,
  next as nextFunction,
  request,
  response,
} from 'inversify-express-utils';
import {inject} from 'inversify';
import {
  createUserSchema,
  updatePasswordSchema,
} from './schemas/input/userSchemas';
import schemaValidator from '../../middleware/schemaValidator';
import authentication from '../../middleware/authentication';

@controller('/user')
class UserController {
  constructor(
    @inject(TYPES.CreateUser)
    private readonly createUser: CreateUser,

    @inject(TYPES.AuthenticateUser)
    private readonly authenticateUser: AuthenticateUser,

    @inject(TYPES.UpdateUserPassword)
    private readonly updateUserPassword: UpdateUserPassword
  ) {}

  @httpPost('/create', schemaValidator.body(createUserSchema))
  create(
    @request() req: Request,
    @response() res: Response,
    @nextFunction() next: NextFunction
  ) {
    const {name, email, password} = req.body;

    return this.createUser
      .execute(name, email, password)
      .then(() => res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED))
      .catch(next);
  }

  @httpPatch(
    '/update-password',
    authentication,
    schemaValidator.body(updatePasswordSchema)
  )
  updatePassword(
    @request() req: Request,
    @response() res: Response,
    @nextFunction() next: NextFunction
  ) {
    const {email, password} = req.body;

    return this.updateUserPassword
      .execute(email, password)
      .then(() =>
        res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT)
      )
      .catch(next);
  }
}

export default UserController;
