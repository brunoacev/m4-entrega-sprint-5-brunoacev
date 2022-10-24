import AppDataSource from "../../data-source";
import { Users } from "../../entities/Users.entity";
import { AppError } from "../../errors/appError";

import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginService = async (
  email: string,
  password: string
): Promise<Object> => {
  const usersRepository = AppDataSource.getRepository(Users);

  const user: Users | null = await usersRepository.findOneBy({ email: email });

  if (!user) throw new AppError(403, "Email or password wrong");

  if (!user.isActive) throw new AppError(403, "User is not active");

  const doesPasswordMatch = await bcrypt.compare(password, user.password);

  if (!doesPasswordMatch) throw new AppError(403, "Email or password wrong");

  const token = jwt.sign(
    { email: email, id: user.id, isAdm: user.isAdm },
    process.env.SECRET_KEY!,
    { expiresIn: "24h" }
  );

  return { token };
};

export { loginService };
