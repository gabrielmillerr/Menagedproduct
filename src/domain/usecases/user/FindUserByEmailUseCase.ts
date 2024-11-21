import { User } from "@/domain/entities/User";
import { UserRepository } from "../../repositories/UserRepository";	
import { CustomError } from "@/shared/utils/CustomError";
import { statusCode } from "@/shared/utils/statusCode";

export class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);

    if(!user) {
      throw new CustomError("User not found", statusCode.NOT_FOUND);
    }

    return user;
  }
}