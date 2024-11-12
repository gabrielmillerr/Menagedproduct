import { User } from "@/domain/entities/user";
import { UserRepository } from "../../repositories/UserRepository";

export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);

    if(!user) {
      throw new Error("User not found");
    }
    
    return user;
  }
}