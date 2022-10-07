import {Request, Response, NextFunction} from 'express';
import {StatusCodes} from 'http-status-codes';
import * as Joi from 'joi';

const errorHandler = (
  err: Joi.ValidationResult,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err && err.error && err.error.isJoi) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.error.toString(),
    });
  } else {
    next(err);
  }
};

export default errorHandler;
