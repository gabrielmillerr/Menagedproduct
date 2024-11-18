import { Category } from "@/domain/entities/Category";

export class FindAllCategory {
  constructor(
    public id: string,
    public name: string
  ) {}

  static fromCategory(category: Category): FindAllCategory {
    return new FindAllCategory(category.id, category.name);
  }
}