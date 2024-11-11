import { PrismaClient } from "@prisma/client";
import { Product } from "../../domain/entities/Product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";
import prisma from "../../prisma";

export class PrismaProductRepository implements ProductRepository {
  async save(product: Product): Promise<void> {
    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock
      }
    })
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id}
    })

    if (!product) return null;

    return Product.with({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock
    })
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({ where: { name } });
    return product ? Product.with(product) : null;
  }

  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany();

    return products.map((product) => {
      return Product.with({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock
      })	
    })
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data,
    });

    return Product.with({
      id: updatedProduct.id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      stock: updatedProduct.stock,
    });
  }
}