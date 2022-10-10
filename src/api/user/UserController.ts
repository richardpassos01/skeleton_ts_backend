import CreateUser from '@application/use_cases/CreateUser';
import UpdateUserPassword from '@application/use_cases/UpdateUserPassword';
import {TYPES} from '@constants/types';
import authentication from '@middleware/authentication';
import schemaValidator from '@middleware/schemaValidator';
import {Request, Response} from 'express';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import {inject} from 'inversify';
import {
  controller,
  httpPatch,
  httpPost,
  request,
  response,
} from 'inversify-express-utils';
import {
  createUserSchema,
  updatePasswordSchema,
} from './schemas/input/userSchemas';

@controller('/user')
class UserController {
  constructor(
    @inject(TYPES.CreateUser)
    private readonly createUser: CreateUser,

    @inject(TYPES.UpdateUserPassword)
    private readonly updateUserPassword: UpdateUserPassword
  ) {}

  @httpPost('/create', schemaValidator.body(createUserSchema))
  async create(
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    const {name, email, password} = req.body;
    await this.createUser.execute(name, email, password);
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
  }

  @httpPatch(
    '/update-password',
    authentication,
    schemaValidator.body(updatePasswordSchema)
  )
  async updatePassword(@request() req: Request, @response() res: Response) {
    const {email, password} = req.body;
    await this.updateUserPassword.execute(email, password);
    res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
  }
}

export default UserController;
