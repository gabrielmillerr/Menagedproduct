import { User } from "@/domain/entities/User";

export class FindByIdUserDTO {
  constructor(
    public id: string,
    public name: string,
    public email: string,
  ) {}

  static fromUser(user: User): FindByIdUserDTO {
    return new FindByIdUserDTO(user.id, user.name, user.email);
  }
}