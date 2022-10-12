import CustomError from '@domain/shared/error/CustomError';
import {NextFunction, Request, Response} from 'express';

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const error = err instanceof CustomError ? err : new CustomError();

  res.status(error.status).send(error);
};

export default errorHandler;
