import { NextFunction, Request, Response } from 'express';
import config from '../../config';
const nodeEnv = config.NODE_ENV;

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const customError = {
    statusCode,
    message: err.message || 'Internal Server Error',
  };
  // Wrong Mongodb Id error
  if (err.name === 'CastError') {
    customError.statusCode = 403;
    customError.message = `Resource not found. Invalid: ${err.message}`;
  }

  // Mongoose duplicate key error
  // if (err.code === 11000) {
  //   customError.statusCode = 403;
  //   customError.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
  // }

  if (err.name === 'TokenExpiredError') {
    customError.statusCode = 403;
    customError.message =
      'Unauthorized: You are not allowed to access this resource';
  }
  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
    stack: nodeEnv === 'production' ? null : err.stack,
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
