import { ProductRepository } from "@/domain/repositories/ProductRepository";
import prisma from "@/prisma";
import { Product } from "@/domain/entities/Product";
import { Category } from "@/domain/entities/Category";
export class PrismaProductRepository implements ProductRepository {
  async save(product: Product): Promise<Product | null> {
    const productCreated = await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        categories: {
          connect: product.categories.map(category => ({ id: category.id }))
        },
      },
      include: { categories: true }
    })

    return Product.with({
      id: productCreated.id,
      name: productCreated.name,
      price: productCreated.price,
      stock: productCreated.stock,
      categories: productCreated.categories.map(category => Category.with({
        id: category.id,
        name: category.name
      }))
    })
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { categories: true }
    });

    if (!product) return null;

    return Product.with({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      categories: product.categories.map(category => Category.with({
        id: category.id,
        name: category.name
      }))
    })
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({ 
      where: { name },
      include: { categories: true }
    }
    );

    if(!product) return null;

    return Product.with({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      categories: product.categories.map(category => Category.with({
        id: category.id,
        name: category.name
      }))
    });
  }

  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      include: { categories: true }
    });

    if (!products) return [];

    return products.map((product) => {
      return Product.with({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        categories: product.categories.map(category => Category.with({
          id: category.id,
          name: category.name
        }))
      })	
    })
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        categories: {
          some: {
            id: categoryId
          }
        }
      },
      include: { categories: true }
    })

    if (!products) return [];

    return products.map(product => {
      return Product.with({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        categories: product.categories.map(category => Category.with({
          id: category.id,
          name: category.name
        }))
      });
    });
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const product = await prisma.product.update({
      where: { id },
      data: {
        stock: data.stock,
      },
      include: { categories: true }
    });
  
    return Product.with({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      categories: product.categories.map(category => Category.with({
        id: category.id,
        name: category.name
      }))
    });
  }
}