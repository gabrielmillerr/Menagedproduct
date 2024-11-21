import { UserRepository } from '@/domain/repositories/UserRepository';
import { JwtService } from '@/domain/services/jwt/JwtService';
import { CustomError } from '@/shared/utils/CustomError';
import { statusCode } from '@/shared/utils/statusCode';
import bcrypt from 'bcrypt';

export type jwtPayload = {
  userId: string;
  name: string;
}

export class AuthenticateUser {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async execute(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new CustomError('User not found', statusCode.NOT_FOUND);
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new CustomError('Invalid password', statusCode.FORBIDDEN);
    }

    const payload = {
      userId: user.id,
      name: user.name,
    };

    const token = await this.jwtService.generateToken(payload);
    return token;
  }
}