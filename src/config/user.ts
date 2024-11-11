import { PrismaUserRepository } from "../infra/repositories/PrismaUserRepository";
import { CreateUser } from "../domain/usecases/user/CreateUserUseCase";
import { FindUserByIdUseCase } from "../domain/usecases/user/FindUserByIdUseCase";
import { FindUserByEmailUseCase } from "../domain/usecases/user/FindUserByEmailUseCase";
import { UserController } from "../application/controllers/UserController";

const userRepository = new PrismaUserRepository();
const createUser = new CreateUser(userRepository);
const findUserById = new FindUserByIdUseCase(userRepository);
const findUserByEmail = new FindUserByEmailUseCase(userRepository);

export const userController = new UserController(
  createUser,
  findUserById,
  findUserByEmail
);
