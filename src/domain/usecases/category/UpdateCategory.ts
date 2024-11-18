import { CategoryRepository } from "@/domain/repositories/CategoryRepository";

export class UpdateCategory {
  constructor( private categoryRepository: CategoryRepository) {}

  async execute(id: string, data: { name: string }) {
    const category = await this.categoryRepository.findById(id);
    if(!category) {
      throw new Error("Category not found");
    }

    const updatedCategory = await this.categoryRepository.update(id, data);
    return updatedCategory;
  }
}