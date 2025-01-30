import { User } from "@/domain/entities/User";

export class AuthDTO {
  constructor (
    public readonly token: string,
    public readonly user: {
        id: string,
        name: string,
        email: string,
    }
  ) {}

  static fromAuth(token: string, user: User): AuthDTO {
    return new AuthDTO(token, {
        id: user.id,
        name: user.name,
        email: user.email
      }
    );
  }
}