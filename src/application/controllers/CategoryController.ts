import { Request, Response } from 'express';
import { CreateCategory } from '@/domain/usecases/category/CreateCategory';
import { UpdateCategory } from '@/domain/usecases/category/UpdateCategory';
import { FindCategory } from '@/domain/usecases/category/FindCatergory';

import { CreateCategoryDTO } from '@/dtos/controllers/category/create.dto';
import { UpdateCategoryDTO } from '@/dtos/controllers/category/update.dto';
import { FindAllCategory } from '@/dtos/controllers/category/findAll.dto';

export class CategoryController {
  constructor(
    private createCategory: CreateCategory,
    private updateCategory: UpdateCategory,
    private findCategory: FindCategory
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    
    try {
      const category = await this.createCategory.execute(name);
      const categoryDTO = CreateCategoryDTO.fromCategory(category);

      res.status(201).json(categoryDTO);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.findCategory.findAll();
      const categoriesDTO = categories.map(FindAllCategory.fromCategory);
      res.status(200).json(categoriesDTO);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const category = await this.findCategory.findById(id);
      const categoryDTO = CreateCategoryDTO.fromCategory(category);
      res.status(200).json(categoryDTO);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const data = req.body;
      const product = await this.updateCategory.execute(id, data);
      const productDTO = UpdateCategoryDTO.fromCategory(product);
      
      res.status(200).json(productDTO);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

}