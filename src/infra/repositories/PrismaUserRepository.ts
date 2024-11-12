import { UserRepository } from "../../domain/repositories/UserRepository";
// import { UserDTO, PublicUserDTO, createUserDTO, createPublicUserDTO } from '@/domain/dtos/userDTO';
import prisma from "../../prisma"; 
import { User } from "@/domain/entities/user"

export class PrismaUserRepository implements UserRepository {
  async save(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
      }
    });

    return User.with(createdUser);
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    })

    if(!user) return null;

    return User.with(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if(!user) return null;

    return User.with(user);
  }
}