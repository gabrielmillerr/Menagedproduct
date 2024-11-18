import { User } from "@/domain/entities/User";
import { UserRepository } from "../../repositories/UserRepository";	

export class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);

    if(!user) {
      throw new Error("User not found");
    }

    return user;
  }
}