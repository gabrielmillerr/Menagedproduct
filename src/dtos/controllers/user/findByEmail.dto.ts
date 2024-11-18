import { User } from "@/domain/entities/User";

export class FindByEmailDTO {
  constructor(
    public id: string,
    public name: string,
    public email: string
  ) {}

  static fromUser(user: User): FindByEmailDTO {
    return new FindByEmailDTO(user.id, user.name, user.email);
  }
}