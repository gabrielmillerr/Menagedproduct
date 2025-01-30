import { AuthDTO } from '@/dtos/controllers/auth/auth.dto';
import { Request, Response, NextFunction } from 'express';
import { AuthenticateUser } from '@/domain/usecases/auth/AuthenticateUser';
import { FindUserByIdUseCase } from '@/domain/usecases/user/FindUserByIdUseCase';

export class AuthController {
  constructor(
    private authService: AuthenticateUser,
    private findUserByIdService: FindUserByIdUseCase
  ){} 

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    try {
      const data = await this.authService.execute(email, password);
      const user = await this.findUserByIdService.execute(data.userId);
      const authDataDTO = AuthDTO.fromAuth(data.token, user);

      res.status(200).json(authDataDTO);
    } catch (error) {
      next(error);
    }
  }
}