import * as Koa from 'koa';

import CustomError from '@domain/shared/error/CustomError';
import ErrorCode from '@domain/shared/error/ErrorCode';
import {Settings} from '@settings';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import * as jsonwebtoken from 'jsonwebtoken';

const authentication = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  const authHeader = ctx.headers.authorization;

  if (!authHeader) {
    throw new CustomError(
      ReasonPhrases.UNAUTHORIZED,
      ErrorCode.UNAUTHORIZED,
      StatusCodes.UNAUTHORIZED
    );
  }

  const [, token] = authHeader.split(' ');

  jsonwebtoken.verify(
    token,
    Settings.accessTokenSecret,
    (err: any, decoded: any) => {
      if (err) {
        throw new CustomError(
          ReasonPhrases.FORBIDDEN,
          ErrorCode.UNEXPECTED_ERROR,
          StatusCodes.FORBIDDEN
        );
      }
      const {email} = ctx.request.body;

      if (email && decoded.email !== email) {
        throw new CustomError(
          ReasonPhrases.UNAUTHORIZED,
          ErrorCode.VIOLETED_TOKEN,
          StatusCodes.FORBIDDEN
        );
      }

      ctx.request.user = decoded;
    }
  );

  return next();
};

export default authentication;
