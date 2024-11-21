import { Category } from '@/domain/entities/Category';

export interface CategoryRepository {
  save(category: Category): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  update(id: string, data: Partial<Category>): Promise<Category>;
}