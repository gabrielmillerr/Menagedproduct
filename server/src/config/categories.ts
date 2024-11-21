import { PrismaCategoryRepository } from '@/infra/repositories/PrismaCategoryRepository';
import { CreateCategory } from '@/domain/usecases/category/CreateCategory';
import { UpdateCategory } from '@/domain/usecases/category/UpdateCategory';
import { CategoryController } from '@/application/controllers/CategoryController';
import { FindCategory } from '@/domain/usecases/category/FindCatergory';

const categoryRepository = new PrismaCategoryRepository();
const createCategory = new CreateCategory(categoryRepository);
const findCategory = new FindCategory(categoryRepository);
const updateCategory = new UpdateCategory(categoryRepository);

export const categoryController = new CategoryController(
  createCategory,
  updateCategory,
  findCategory
);