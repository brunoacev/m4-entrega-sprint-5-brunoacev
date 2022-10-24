import { Request, Response } from "express";
import { listUsersService } from "../../services/users/listUsers.service";

const listAllUsersController = async (request: Request, response: Response) => {
  const output = await listUsersService();

  return response.status(200).json(output);
};

export default listAllUsersController;
