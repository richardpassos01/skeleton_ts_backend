import AuthenticateUser from '@application/use_cases/AuthenticateUser';
import {TYPES} from '@constants/types';
import schemaValidator from '@middleware/schemaValidator';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {inject} from 'inversify';
import {controller, httpPost, request, response} from 'inversify-express-utils';
import {authenticateUserSchema} from './schemas/input/authenticationSchemas';

@controller('/authentication')
class AuthenticationController {
  constructor(
    @inject(TYPES.AuthenticateUser)
    private readonly authenticateUser: AuthenticateUser
  ) {}

  @httpPost('/authenticate', schemaValidator.body(authenticateUserSchema))
  async authenticate(
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    const {email, password} = req.body;
    const result = await this.authenticateUser.execute(email, password);
    res.status(StatusCodes.OK).send(result);
  }
}

export default AuthenticationController;
