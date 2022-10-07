import {Request, Response, NextFunction} from 'express';
import * as jsonwebtoken from 'jsonwebtoken';
import {StatusCodes} from 'http-status-codes';
import {jwt} from '../config';

interface AuthRequest extends Request {
  user?: string | jsonwebtoken.JwtPayload;
}

function authentication(
  request: AuthRequest,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.sendStatus(StatusCodes.UNAUTHORIZED);
  }

  const [, token] = authHeader.split(' ');

  return jsonwebtoken.verify(token, jwt.accessTokenSecret, (err, user) => {
    if (err) {
      return response.sendStatus(StatusCodes.FORBIDDEN);
    }

    request.user = user;
    return next();
  });
}

export default authentication;
