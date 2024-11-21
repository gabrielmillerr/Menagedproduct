import { UserRepository } from "@/domain/repositories/UserRepository"
import { User } from "@/domain/entities/User"
import { CustomError } from "@/shared/utils/CustomError";
import { statusCode } from "@/shared/utils/statusCode";

export class CreateUser {
  constructor( private userRepository: UserRepository) {}

  async execute(name: string, email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if(user) {
      throw new CustomError("Email already exists", statusCode.CONFLICT);
    }

    const newUser = await User.create(name, email, password);

    return await this.userRepository.save(newUser);
  }
}