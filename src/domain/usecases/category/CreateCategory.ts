import { Category } from "@/domain/entities/Category";
import { CategoryRepository } from '@/domain/repositories/CategoryRepository';

export class CreateCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(name: string) {
    const category = await this.categoryRepository.findById(name);

    if (category) {
      throw new Error('Category already exists');
    }

    const newCategory = Category.create(name);
    await this.categoryRepository.save(newCategory);

    return newCategory;
  }
}