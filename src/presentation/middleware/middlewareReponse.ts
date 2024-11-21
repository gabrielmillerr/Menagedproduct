import { NextFunction, Request, Response } from 'express';

const errorHandler = (error: any, req: Request, res: Response) => {
  if (error.name === "CustomError") {
    const response = error;
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
    return;
  }

  res.status(500).json({
    message: error.message
  });
};

export { errorHandler };
