import { ProductRepository } from "@/domain/repositories/ProductRepository";
import { Product } from "@/domain/entities/Product";

export class FindProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async findById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findByCategory (categoryId: string): Promise<Product[]> {
    return this.productRepository.findByCategory(categoryId);
  }
}