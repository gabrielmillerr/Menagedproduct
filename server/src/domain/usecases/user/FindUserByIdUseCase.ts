import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { CustomError } from "@/shared/utils/CustomError";
import { statusCode } from "@/shared/utils/statusCode";

export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);

    if(!user) {
      throw new CustomError("User not found", statusCode.NOT_FOUND);
    }
    
    return user;
  }
}