import { UserRepository } from "@/domain/repositories/UserRepository"
import { User } from "@/domain/entities/User"

export class CreateUser {
  constructor( private userRepository: UserRepository) {}

  async execute(name: string, email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if(user) {
      throw new Error("Email already exists");
    }

    const newUser = await User.create(name, email, password);

    await this.userRepository.save(newUser);

    return User.with(newUser);
  }
}