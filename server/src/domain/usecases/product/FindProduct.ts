import { ProductRepository } from "@/domain/repositories/ProductRepository";
import { Product } from "@/domain/entities/Product";
import { CustomError } from "@/shared/utils/CustomError";
import { statusCode } from "@/shared/utils/statusCode";

export class FindProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async findById(id: string): Promise<Product | null> { 
    const product = this.productRepository.findById(id);

    if (!product) {
      throw new CustomError('Product not found', statusCode.NOT_FOUND);
    }

    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findByCategory (categoryId: string): Promise<Product[]> {
    return this.productRepository.findByCategory(categoryId); 
  }
}