import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {inject} from 'inversify';
import {
  controller,
  httpPost,
  next as nextFunction,
  request,
  response,
} from 'inversify-express-utils';
import AuthenticateUser from '../../application/use_cases/AuthenticateUser';
import {TYPES} from '../../constants/types';
import schemaValidator from '../../middleware/schemaValidator';
import {authenticateUserSchema} from './schemas/input/authenticationSchemas';

@controller('/authentication')
class AuthenticationController {
  constructor(
    @inject(TYPES.AuthenticateUser)
    private readonly authenticateUser: AuthenticateUser
  ) {}

  @httpPost('/authenticate', schemaValidator.body(authenticateUserSchema))
  authenticate(
    @request() req: Request,
    @response() res: Response,
    @nextFunction() next: NextFunction
  ) {
    const {email, password} = req.body;

    return this.authenticateUser
      .execute(email, password)
      .then(token => res.status(StatusCodes.OK).send(token))
      .catch(next);
  }
}

export default AuthenticationController;
