import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyAuthMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  const token = authorization?.split(" ")[1];

  if (!token) throw new AppError(401, "Missing authorization token");

  try {
    const verify = jwt.verify(token, process.env.SECRET_KEY!);

    if (verify) next();
  } catch (error) {
    throw new AppError(401, "Invalid token");
  }
};

export { verifyAuthMiddleware };
