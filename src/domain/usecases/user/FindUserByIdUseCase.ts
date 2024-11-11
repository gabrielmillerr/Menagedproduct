import { UserRepository } from "../../repositories/UserRepository";
import { PublicUserDTO } from "@/domain/dtos/userDTO";

export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<PublicUserDTO | null> {
    const user = await this.userRepository.findById(id);

    if(!user) {
      throw new Error("User not found");
    }
    
    return user;
  }
}