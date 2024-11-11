import { UserRepository } from "../../repositories/UserRepository";	
import { PublicUserDTO } from "@/domain/dtos/userDTO";

export class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<PublicUserDTO | null> {
    const user = await this.userRepository.findByEmail(email);

    if(!user) {
      throw new Error("User not found");
    }

    return user;
  }
}