import AppDataSource from "../../data-source";
import { Users } from "../../entities/Users.entity";
import { IUser, IUserRequest } from "../../interfaces/users";
import { AppError } from "../../errors/appError";
import { hash } from "bcrypt";

const createUsersService = async ({
  name,
  email,
  isAdm,
  password,
}: IUserRequest): Promise<IUser> => {
  const usersRepository = AppDataSource.getRepository(Users);

  if (!(name && email && password))
    throw new AppError(400, "Request has wrong format!");

  if (typeof name != "string")
    throw new AppError(400, "Name must be a string!");

  if (typeof email != "string")
    throw new AppError(400, "Email must be a string!");

  if (typeof password != "string")
    throw new AppError(400, "Password must be a string!");

  const isEmailAlreadyRegistered = await usersRepository.findOne({
    where: { email: email },
  });

  if (isEmailAlreadyRegistered)
    throw new AppError(400, "User is already register!");

  const user = new Users();
  user.name = name;
  user.email = email;
  user.isAdm = isAdm || false;
  user.isActive = true;
  user.password = await hash(password, 10);

  const createdUser: Users = await usersRepository.save(user);

  const result: IUser = { ...createdUser,  };

  delete result.password;

  return result;
};

export { createUsersService };
