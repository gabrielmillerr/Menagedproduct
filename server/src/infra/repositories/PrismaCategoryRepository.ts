import { Category } from "@/domain/entities/Category";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import prisma from "@/prisma";

export class PrismaCategoryRepository implements CategoryRepository {
  async save(category: Category): Promise<Category | null> {
    const createdCategory = await prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
        products: {
          connect: category.products.map(product => ({ id: product.id }))
        }
      }
    })

    return Category.with({
      id: createdCategory.id,
      name: createdCategory.name
    })
  }

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { products: true }
    })

    if (!category) return null
  
    return Category.with({
      id: category.id,
      name: category.name,
    })
  }

  async findAll(): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      include: { products: true }
    })

    if (!categories) return []

    return categories.map(category => Category.with({
      id: category.id,
      name: category.name,
    }))
  }

  async update(id: string, data: Partial<Category>): Promise<Category> {
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        products: data.products && {
          connect: data.products.map(product => ({ id: product.id }))
        }
      },
      include: { products: true }
    })

    return Category.with({
      id: category.id,
      name: category.name
    })
  }
}