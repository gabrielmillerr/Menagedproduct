import jwt from 'jsonwebtoken';

export class JwtService {
  async generateToken(payload: object): Promise<string> {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
  }

  async verifyToken(token: string): Promise<string> {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}