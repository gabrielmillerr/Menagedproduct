import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { CustomError } from '@/shared/utils/CustomError'
import { statusCode } from '@/shared/utils/statusCode';

export class UpdateCategory {
  constructor( private categoryRepository: CategoryRepository) {}

  async execute(id: string, data: { name: string }) {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new CustomError('Category not found', statusCode.NOT_FOUND);
    }

    return await this.categoryRepository.update(id, data);
  }
}