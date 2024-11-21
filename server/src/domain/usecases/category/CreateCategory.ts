import { Category } from "@/domain/entities/Category";
import { CategoryRepository } from '@/domain/repositories/CategoryRepository';
import { CustomError } from '@/shared/utils/CustomError'
import { statusCode } from '@/shared/utils/statusCode';

export class CreateCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(name: string) {
    const category = await this.categoryRepository.findById(name);

    if (category) {
      throw new CustomError('Category already exists', statusCode.CONFLICT);
    }
    
    const newCategory = Category.create(name);
    return this.categoryRepository.save(newCategory);
  }
}