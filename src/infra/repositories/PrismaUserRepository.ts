import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserDTO, PublicUserDTO, createUserDTO, createPublicUserDTO } from '@/domain/dtos/userDTO';
import prisma from "../../prisma"; 

export class PrismaUserRepository implements UserRepository {
  async save(user: UserDTO): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
      }
    })
  }

  async findById(id: string): Promise<UserDTO | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    })

    if(!user) return null;

    return createUserDTO(user);
  }

  async findByEmail(email: string): Promise<PublicUserDTO | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if(!user) return null;

    return createPublicUserDTO(user);
  }
}