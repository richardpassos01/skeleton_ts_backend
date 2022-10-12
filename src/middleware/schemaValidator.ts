import CustomError from '@domain/shared/error/CustomError';
import ErrorCode from '@domain/shared/error/ErrorCode';
import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import * as Joi from 'joi';

const schemaValidator = (schema: Joi.ObjectSchema) => {
  return async function validationMiddleware(
    request: Request,
    _response: Response,
    next: NextFunction
  ) {
    const validation = schema.validate(request.body);
    if (validation.error) {
      return next(
        new CustomError(
          validation.error.message,
          ErrorCode.SCHEMA_VALIDATOR,
          StatusCodes.UNPROCESSABLE_ENTITY
        )
      );
    }
    return next();
  };
};

export default schemaValidator;
