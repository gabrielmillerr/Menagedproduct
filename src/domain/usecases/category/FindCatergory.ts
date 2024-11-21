import { CategoryRepository } from '@/domain/repositories/CategoryRepository';
import { Category } from '@/domain/entities/Category';
import { CustomError } from '@/shared/utils/CustomError'
import { statusCode } from '@/shared/utils/statusCode';

export class FindCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findById(id: string): Promise<Category | null> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new CustomError('Category not found', statusCode.NOT_FOUND);
    };

    return category;
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}