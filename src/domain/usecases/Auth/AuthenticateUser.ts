import { UserRepository } from '@/domain/repositories/UserRepository';
import { JwtService } from '@/domain/services/jwt/JwtService';
import { ResponseHandler, Response } from '@/shared/utils/ResponseHandler';
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

  async execute(email: string, password: string): Promise<Response<any>> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error('Invalid password');
    }

    const payload = {
      userId: user.id,
      name: user.name,
    };

    const token = await this.jwtService.generateToken(payload);
    return ResponseHandler.success({token});
  }
}