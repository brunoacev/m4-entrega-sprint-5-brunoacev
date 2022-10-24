import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const globalErrorMiddleware = (
  error: any,
  request: Request,
  response: Response,
  _: NextFunction
) => {
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({
        status: "error",
        code: error.statusCode,
        message: error.message,
      });
  }

  return response
    .status(500)
    .json({ status: "error", code: 500, message: error.message });
};

export { globalErrorMiddleware };
