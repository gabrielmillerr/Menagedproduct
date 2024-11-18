import { Request, Response } from 'express';
import { AuthenticateUser } from '@/domain/usecases/Auth/AuthenticateUser';

export class AuthController {
 constructor(private authService: AuthenticateUser) {}
 
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    try {
      const token = await this.authService.execute(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}