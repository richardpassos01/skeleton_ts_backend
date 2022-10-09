import CustomError from '../domain/shared/error/CustomError';
import {Request, Response, NextFunction} from 'express';
import ErrorCode from '../domain/shared/error/ErrorCode';
import {StatusCodes} from 'http-status-codes';

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error: CustomError = new CustomError();

  if (err?.error?.isJoi) {
    error = new CustomError(
      err.error.toString(),
      ErrorCode.SCHEMA_VALIDATOR,
      StatusCodes.UNPROCESSABLE_ENTITY
    );
  }

  if (err.customCode) {
    error = err;
  }

  res.status(error.status).send(error);
};

export default errorHandler;
