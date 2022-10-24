import AppDataSource from "../../data-source";
import { Users } from "../../entities/Users.entity";
import { IUser } from "../../interfaces/users";

const listUsersService = async (): Promise<Array<IUser>> => {
  const usersRepository = AppDataSource.getRepository(Users);

  const users: Array<IUser> = await usersRepository.find();

  users.forEach((element) => delete element.password);

  return users;
};

export { listUsersService };
