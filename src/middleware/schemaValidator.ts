import CustomError from '@domain/shared/error/CustomError';
import ErrorCode from '@domain/shared/error/ErrorCode';
import {StatusCodes} from 'http-status-codes';
import * as Joi from 'joi';

import * as Koa from 'koa';

const schemaValidator = (schema: Joi.ObjectSchema) => {
  return async function validationMiddleware(ctx: Koa.Context, next: Koa.Next) {
    const validation = schema.validate(ctx.request.body);
    if (validation.error) {
      throw new CustomError(
        validation.error.message,
        ErrorCode.SCHEMA_VALIDATOR,
        StatusCodes.UNPROCESSABLE_ENTITY
      );
    }
    return next();
  };
};

export default schemaValidator;
