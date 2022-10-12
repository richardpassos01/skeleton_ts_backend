import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import CustomError from '../../shared/error/CustomError';
import ErrorCode from './ErrorCode';

export class UserNotFound extends CustomError {
  customCode = ErrorCode.NOT_FOUND;
  message = ReasonPhrases.NOT_FOUND;
  status = StatusCodes.NOT_FOUND;
}
export class InvalidPassword extends CustomError {
  customCode = ErrorCode.UNAUTHORIZED;
  message = 'invalid email or password';
  status = StatusCodes.UNAUTHORIZED;
}
export class UserAlreadyExists extends CustomError {
  customCode = ErrorCode.ALREADY_EXISTS;
  message = ReasonPhrases.FORBIDDEN;
  status = StatusCodes.FORBIDDEN;
}
