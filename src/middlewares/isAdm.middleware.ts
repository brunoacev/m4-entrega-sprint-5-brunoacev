import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";

const isAdmMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization) throw new AppError(401, "missing token");

  const token = authorization.split(" ")[1];

  const { isAdm } = jwt.decode(token) as { isAdm: boolean };

  if (!isAdm) throw new AppError(403, "User is not adm");

  next();
};

export { isAdmMiddleware };
