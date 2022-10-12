import CustomError from '@domain/shared/error/CustomError';
import ErrorCode from '@domain/shared/error/ErrorCode';
import {Settings} from '@settings';
import {NextFunction, Request, Response} from 'express';

import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import * as jsonwebtoken from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: string | jsonwebtoken.JwtPayload;
}

const authentication = (
  request: AuthRequest,
  _response: Response,
  next: NextFunction
): void => {
  const authHeader = request.headers.authorization;

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
      const {email} = request.body;

      if (email && decoded.email !== email) {
        throw new CustomError(
          ReasonPhrases.UNAUTHORIZED,
          ErrorCode.VIOLETED_TOKEN,
          StatusCodes.FORBIDDEN
        );
      }

      request.user = decoded;
    }
  );

  return next();
};

export default authentication;
