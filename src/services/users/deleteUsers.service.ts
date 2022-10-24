import AppDataSource from "../../data-source";
import { Users } from "../../entities/Users.entity";
import { AppError } from "../../errors/appError";

const deleteUsersService = async (id: string): Promise<void> => {
  const usersRepository = AppDataSource.getRepository(Users);

  const user: Users | null = await usersRepository.findOneBy({ id: id });

  if (!user) throw new AppError(404, "User not found!");

  if (!user.isActive) throw new AppError(400, "User is already deleted!");

  usersRepository.update(id, { isActive: false });
};

export { deleteUsersService };
