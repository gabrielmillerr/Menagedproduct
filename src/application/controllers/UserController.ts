import { Request, Response } from 'express';
import { CreateUser } from "../../domain/usecases/user/CreateUserUseCase";
import { FindUserByIdUseCase } from "../../domain/usecases/user/FindUserByIdUseCase"; // Use case para buscar usuário por ID
import { FindUserByEmailUseCase } from "../../domain/usecases/user/FindUserByEmailUseCase"; // Use case para buscar usuário por e-mail
import { CreateUserDTO } from "@/dtos/controllers/user/create.dto";
import { FindByIdUserDTO } from "@/dtos/controllers/user/findbyId.dto";
import { FindByEmailDTO } from "@/dtos/controllers/user/findByEmail.dto";

export class UserController {
  constructor(
    private createUser: CreateUser,
    private findUserById: FindUserByIdUseCase,
    private findUserByEmail: FindUserByEmailUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const user = await this.createUser.execute(name, email, password);

      const userDTO = CreateUserDTO.fromUser(user);
      res.status(201).json(userDTO);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await this.findUserById.execute(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const userDTO = FindByIdUserDTO.fromUser(user);
      res.status(200).json(userDTO);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async findByEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    try {
      const user = await this.findUserByEmail.execute(email);

      if (!user) res.status(404).json({ message: "User not found" });

      const userDTO = FindByEmailDTO.fromUser(user);
      res.status(200).json(userDTO);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
