import { Category } from "@/domain/entities/Category";

export class UpdateCategoryDTO {
  constructor(
    public id: string,
    public name: string
  ) {}

  static fromCategory(category: Category): UpdateCategoryDTO {
    return new UpdateCategoryDTO(category.id, category.name);
  }
}