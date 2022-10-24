import { Request, Response } from "express";
import { createUsersService } from "../../services/users/createUsers.service";
import { IUserRequest } from "../../interfaces/users";

const createNewUsersController = async (
  request: Request,
  response: Response
) => {
  const { name, email, isAdm, password }: IUserRequest = request.body;

  const output = await createUsersService({ name, email, isAdm, password });

  return response.status(201).json(output);
};

export default createNewUsersController;
