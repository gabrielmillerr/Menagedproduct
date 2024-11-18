import { AuthController } from '@/application/controllers/authController';
import { AuthenticateUser } from '@/domain/usecases/Auth/AuthenticateUser';
import { PrismaUserRepository } from '@/infra/repositories/PrismaUserRepository';
import { JwtService } from '@/domain/services/jwt/JwtService';

const userRepository = new PrismaUserRepository();
const jwtService = new JwtService();
const authService = new AuthenticateUser(userRepository, jwtService);

export const authController = new AuthController(
  authService
);