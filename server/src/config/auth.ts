import { AuthController } from '@/application/controllers/authController';
import { AuthenticateUser } from '@/domain/usecases/auth/AuthenticateUser';
import { PrismaUserRepository } from '@/infra/repositories/PrismaUserRepository';
import { JwtService } from '@/domain/services/jwt/JwtService';
import { FindUserByIdUseCase } from "@/domain/usecases/user/FindUserByIdUseCase";
const userRepository = new PrismaUserRepository();
const jwtService = new JwtService();
const authService = new AuthenticateUser(userRepository, jwtService);
const findUserByIdService = new FindUserByIdUseCase(userRepository);

export const authController = new AuthController(
  authService,
  findUserByIdService
);