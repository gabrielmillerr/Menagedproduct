import { Category } from '@/domain/entities/Category';

export class CreateCategoryDTO {
  constructor (
    public name: string
  ) {}

  static fromCategory(category: Category): CreateCategoryDTO {
     return new CreateCategoryDTO(category.name);
  }
}