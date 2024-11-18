import { Category } from '@/domain/entities/Category';

export class FindByIdCategoryDTO {
  constructor(
    public id: string,
    public name: string
  ) {}
  
  static fromCategory(category: Category): FindByIdCategoryDTO {
    return new FindByIdCategoryDTO(category.id, category.name);
  }
}