import { CategoryRepository } from '@/domain/repositories/CategoryRepository'
import { Category } from '@/domain/entities/Category'

export class FindCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findById(id: string): Promise<Category | null> {
    return this.categoryRepository.findById(id)
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll()
  }
}