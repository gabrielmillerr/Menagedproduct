import { NextFunction, Request, Response } from 'express';
import { statusCode } from '@/shared/utils/statusCode';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route not found`);
  res.status(statusCode.NOT_FOUND).json({
    message: error.message,
    statusCode: statusCode.NOT_FOUND,
  });
}

const errorHandler = (error: any, req: Request, res: Response) => {
  if (error.name === "CustomError") {
    const response = error;
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
    return;
  }

  res.status(statusCode.NOT_FOUND).json({
    message: error.message
  });
};

export { errorHandler, notFoundHandler };
