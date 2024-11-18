import { User } from "@/domain/entities/User";

export class CreateUserDTO {
  constructor(
    public id: string,
    public name: string,
    public email: string
  ) {}

  static fromUser(user: User): CreateUserDTO {
    return new CreateUserDTO(user.id, user.name, user.email);
  }
}